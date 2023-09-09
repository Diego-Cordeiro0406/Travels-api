const route = require('express').Router();
const { carController } = require('../controllers');

route.get('/', carController.findAll);

route.get('/:carId', carController.findById);

route.post('/', carController.insert);

// route.put(/:carId, carController.updateCar);

// route.delete(/:carId, carController.deleteCar);

module.exports = route;