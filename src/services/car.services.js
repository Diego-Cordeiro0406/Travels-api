const { carsModel, driversModel } = require('../models');
const {
    validateNewCar,
    isValidLicensePlateFormat,
    carExists,
} = require('./validations/validationsInputValues');

const driverExists = async (driverId) => {
    const driver = await driversModel.findById(driverId);
    return driver || false;
  };

const validatePlate = (licensePlate) => {
    const isValidPlate = isValidLicensePlateFormat(licensePlate);
    if (!isValidPlate) {
    return {
      status: 'INVALID_VALUES',
      data: { message: 'Invalid license plate' },
    };
  }
};

const createCar = async ({ model, licensePlate, year, color, driverId }) => {
    const error = validateNewCar({ model, color, year, licensePlate, driverId });
    if (error) return { status: error.status, data: { message: error.message } };

    const driver = await driverExists(driverId);
    if (!driver) return { status: 'NOT_FOUND', data: { message: 'Driver not found' } };
    
    const carPlate = await carExists(licensePlate);
    if (carPlate) return { status: 'ALREADY_EXISTS', data: { message: 'Car already exists' } };

    const licensePlateError = await validatePlate(licensePlate);
    if (licensePlateError) return licensePlateError;

    const carId = await carsModel.insert({ model, licensePlate, year, color, driverId });
    const newCar = { id: carId, model, licensePlate, year, color, driverId };
    
    return { status: 'CREATED', data: newCar };
};

const findAll = async () => {
    const cars = await carsModel.findAll();

    if (!cars || cars.length === 0) {
      return { status: 'NOT_FOUND', data: { message: 'there are no cars registered' } };
    }
    return { status: 'SUCCESSFUL', data: cars };
};

const findById = async (carId) => {
  const car = await carsModel.findById(carId);

  if (!car || car.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Car not found' } };
  }
  return { status: 'SUCCESSFUL', data: car };
};

const deleteCar = async (carId) => {
  const car = await carsModel.findById(carId);

  if (!car || car.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Car not found' } };
  }
  await carsModel.deleteCar(carId);
  return { status: 'NO_CONTENT' };
}; 

module.exports = {
    createCar,
    driverExists,
    findAll,
    findById,
    deleteCar,
};