const camelize = require('camelize');
const connection = require('./connection');

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
  const [{ insertId }] = await connection
  .execute('INSERT INTO drivers(name) VALUES (?)', [driver.name]);
  return insertId;
};
module.exports = {
    findAll,
    findById,
    insert,
};