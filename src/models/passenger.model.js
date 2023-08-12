const camelize = require('camelize');
const connection = require('./connection');

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

const deleteById = async (passengerId) => {
  await connection.execute('DELETE FROM passengers WHERE id = ?', [passengerId]);
};

module.exports = {
  findAll,
  findById,
  deleteById,
};