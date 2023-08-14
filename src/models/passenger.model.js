const camelize = require('camelize');
const connection = require('./connection');

const {
  getFormattedColumnNames,
  getFormattedPlaceholders,
} = require('../utils/generateFormattedQuery');

const findAll = async () => {
    const [passengers] = await connection.execute(
        'SELECT * FROM passengers',
      );
      return camelize(passengers);
};

const findById = async (passengerId) => {
  const [[passenger]] = await connection.execute(
    'SELECT * FROM passengers WHERE id = ?',
    [passengerId],
  );
  return camelize(passenger);
};

const insert = async (passenger) => {
  const columns = getFormattedColumnNames(passenger);
    const placeholders = getFormattedPlaceholders(passenger);
    const query = `INSERT INTO passengers (${columns}) VALUES (${placeholders})`;
  
    const [{ insertId }] = await connection.execute(query, [...Object.values(passenger)]);
  
    return insertId;
};

const deleteById = async (passengerId) => {
  await connection.execute('DELETE FROM passengers WHERE id = ?', [passengerId]);
};

module.exports = {
  findAll,
  findById,
  deleteById,
  insert,
};