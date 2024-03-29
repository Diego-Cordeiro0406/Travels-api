const { passengerModel } = require('../models');
const {
  isValidPhoneNumber,
  validateNewPassenger,
} = require('./validations/validationsInputValues');

const validatePhone = (phone) => {
  const isValidPhone = isValidPhoneNumber(phone);
  if (!isValidPhone) {
    return { status: 'INVALID_VALUES', data: { message: 'Invalid phone' } };
  }
};

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

const insert = async (passenger) => {
  const error = validateNewPassenger(passenger);
  if (error) return { status: error.status, data: { message: error.message } };

  const phoneError = validatePhone(passenger.phone);
  if (phoneError) return phoneError;

  const passengerId = await passengerModel.insert(passenger);
  const newPassenger = { id: passengerId, ...passenger };

  return { status: 'CREATED', data: newPassenger };
};

const updatePassenger = async (updatedPassenger, id) => {
  const error = validateNewPassenger(updatedPassenger);
  if (error) return { status: error.status, data: { message: error.message } };

  const phoneError = validatePhone(updatedPassenger.phone);
  if (phoneError) return phoneError;

  await passengerModel.updatePassenger(updatedPassenger, id);

  return { status: 'SUCCESSFUL', data: updatedPassenger };
};

const deleteById = async (passengerId) => {
  const passengerExists = await passengerModel.findById(passengerId);

  if (!passengerExists || passengerExists.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Passenger not found' } };
  }

  await passengerModel.deleteById(passengerId);

  return { status: 'NO_CONTENT' };
};

module.exports = {
  findAll,
  findById,
  insert,
  deleteById,
  updatePassenger,
};