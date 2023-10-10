const camelize = require('camelize');
const connection = require('./connection');

const {
  getFormattedColumnNames,
  getFormattedPlaceholders,
} = require('../utils/generateFormattedQuery');

const findAll = async () => {
  const [drivers] = await connection.execute(
    'SELECT * FROM drivers',
  );
  return camelize(drivers);
};

const findById = async (driverId) => {
  const [[driver]] = await connection
  .execute('SELECT * FROM drivers WHERE id = ?', [driverId]);
  return camelize(driver);
};

const insert = async (driver) => {
  const columns = getFormattedColumnNames(driver);
    const placeholders = getFormattedPlaceholders(driver);
    const query = `INSERT INTO passengers (${columns}) VALUES (${placeholders})`;
  
    const [{ insertId }] = await connection.execute(query, [...Object.values(driver)]);
  
    return insertId;
};

const updateDriver = async () => {
  // A fazer...
};

const deleteDriver = async () => {
 // A fazer...
};

module.exports = {
    findAll,
    findById,
    insert,
};