const { carService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const findAll = async (_req, res) => {
    const { status, data } = await carService.findAll();

    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }
      res.status(mapStatusHTTP(status)).json(data);
};

const findById = async (req, res) => {
    const { carId } = req.params;
    const { status, data } = await carService.findById(carId);
  
    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }
  
    res.status(mapStatusHTTP(status)).json(data);
  };

const insert = async (req, res) => {
    const car = req.body;
  
    const { status, data } = await carService.createCar(car);
  
    if (status !== 'CREATED') {
      return res.status(mapStatusHTTP(status)).json(data);
    }
  
    res.status(mapStatusHTTP(status)).json(data);
  };

const updateCar = async () => {
    // A fazer...
  };

const deleteCar = async () => {
    // A fazer...
  }; 

module.exports = {
  findAll,
  findById,
  insert,
};