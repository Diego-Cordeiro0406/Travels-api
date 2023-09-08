const route = require('express').Router();
const { passengerController } = require('../controllers');
const validateTravelFields = require('../controllers/middlewares/validateTravelFields');

route.get('/', passengerController.findAll);

route.get('/:passengerId', passengerController.findById);

route.post('/:passengerId/request/travel', validateTravelFields, passengerController.createTravel);

route.post('/', passengerController.insert);

route.put('/:passengerId', passengerController.updatePassenger);

route.delete('/:passengerId', passengerController.deleteById);

module.exports = route;
