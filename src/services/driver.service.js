const { driversModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const findAll = async () => {
  const data = await driversModel.findAll();
  if (!data || data.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'there are no registered drivers' } };
  }
  return { status: 'SUCCESSFUL', data };
};

const findById = async (driverId) => {
  const data = await driversModel.findById(driverId);
  if (!data) return { status: 'NOT_FOUND', data: { message: 'Driver not found' } }; 
  return { status: 'SUCCESSFUL', data };
};

const createDriver = async (driverDataObject) => {
  const error = schema.validateNewDriver(driverDataObject);
  if (error) return { status: error.status, data: { message: error.message } };

  const insertDriver = await driversModel.insert(driverDataObject);
  const newDriver = await driversModel.findById(insertDriver);

  return { status: 'CREATED', data: newDriver };
};           

module.exports = {
    findAll,
    findById,
    createDriver,
};