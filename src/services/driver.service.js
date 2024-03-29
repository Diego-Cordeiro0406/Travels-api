const { driversModel } = require('../models');
const schema = require('./validations/validationsInputValues');

const findAll = async () => {
  const data = await driversModel.findAll();
  if (!data || data.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'There are no registered drivers' } };
  }
  return { status: 'SUCCESSFUL', data };
};

const findById = async (driverId) => {
  const data = await driversModel.findById(driverId);
  if (!data || data.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Driver not found' } }; 
  }
  return { status: 'SUCCESSFUL', data };
};

const createDriver = async (driverDataObject) => {
  const error = schema.validateNewDriver(driverDataObject);
  if (error) return { status: error.status, data: { message: error.message } };

  const insertDriver = await driversModel.insert(driverDataObject);
  const newDriver = await driversModel.findById(insertDriver);

  return { status: 'CREATED', data: newDriver };
};           

const deleteDriver = async (driverId) => {
  const driver = await driversModel.findById(driverId);

  if (!driver || driver.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Driver not found' } };
  }
  await driversModel.deleteDriver(driverId);
  return { status: 'NO_CONTENT' };
};

module.exports = {
    findAll,
    findById,
    createDriver,
    deleteDriver,
};