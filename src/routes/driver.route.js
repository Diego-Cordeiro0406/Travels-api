const route = require('express').Router();
const { driverController } = require('../controllers');
const validateDriverFields = require('../controllers/middlewares/validateDriverFields');

route.get('/open/travels', driverController.openTravels);

route.get('/', driverController.findAll);

route.get('/:driverId', driverController.findById);

route.post('/', validateDriverFields, driverController.createDriver);

route.delete('/:driverId', driverController.deleteDriver);

module.exports = route;