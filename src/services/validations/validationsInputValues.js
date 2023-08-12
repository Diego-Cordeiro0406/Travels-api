const { addCarSchema, addRequestTravelSchema, addDriverSchema } = require('./schemas');
const { carsModel } = require('../../models');

const validateNewCar = ({ model, licensePlate, year, color, driverId }) => {
  const { error } = addCarSchema
    .validate({ model, licensePlate, year, color, driverId });
  if (error) return { status: 'INVALID_VALUE', message: error.message };
};

const isValidLicensePlateFormat = (licensePlate) => {
  // esse regex permite os dois formatos de placa. 
  // O | representa uma alternativa, ou seja, o regex aceita o primeiro padrão  "LLLNNN" (^[A-Z]{3}[0-9]{3}[A-Z0-9]$) 
  // ou o segundo padrão "LLLNLNN" (^[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2}$).
  const licensePlateRegex = /^[A-Z]{3}[0-9]{3}[A-Z0-9]$|^[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2}$/;

  return licensePlateRegex.test(licensePlate);
};

const carExists = async (licensePlate) => {
  const car = await carsModel.findByPlate(licensePlate);
  return car || false;
};

const validateRequestTravel = (keysObjectToValidate) => {
  const { error } = addRequestTravelSchema.validate(keysObjectToValidate);
  if (error) return { status: 'INVALID_VALUE', message: error.message };
};

const validateNewDriver = (objectToValidate) => {
  const { error } = addDriverSchema.validate(objectToValidate);
  if (error) return { status: 'INVALID_VALUE', message: error.message };
};

module.exports = {
  validateNewCar,
  isValidLicensePlateFormat,
  carExists,
  validateRequestTravel,
  validateNewDriver,
};