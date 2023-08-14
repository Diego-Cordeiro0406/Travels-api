const { passengerModel } = require('../models');

const findAll = async () => {
  const data = await passengerModel.findAll();
  if (!data || data.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'There are no registered passengers' } };
  }

  return { status: 'SUCCESSFUL', data };
};

const findById = async (passengerId) => {
  const data = await passengerModel.findById(passengerId);
  if (!data || data.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Passenger not found' } };
  }
  return { status: 'SUCCESSFUL', data };
};

const deleteById = async (passengerId) => {
  const data = await passengerModel.deleteById(passengerId);
  if (!data) {
    return { status: 'NOT_FOUND', data: { message: 'Passenger not found' } };
  }
  return { status: 'NO_CONTENT', data };
};

module.exports = {
  findAll,
  findById,
  deleteById,
};