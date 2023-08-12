const express = require('express');
const { passengerModel, travelModel } = require('./models');
const { carService } = require('./services');
const { passengerRoutes, driverRoutes } = require('./routes');

const app = express();

app.use(express.json());
app.use('/passengers', passengerRoutes);
app.use('/drivers', driverRoutes);

app.get('/passengers', async (_req, res) => {
    const passengers = await passengerModel.findAll();
    return res.status(200).json(passengers);
  });

app.get('/passengers/:passengerId', async (req, res) => {
    const { passengerId } = req.params;
    const passenger = await passengerModel.findById(passengerId);
    if (!passenger) return res.status(404).json({ message: 'Passenger not found' });
    return res.status(200).json(passenger);
  });

app.delete('/passengers/:passengerId', async (req, res) => {
    const { passengerId } = req.params;
    await passengerModel.deleteById(passengerId);
    return res.status(204).end();
  });

app.post('/cars', async (req, res) => {
  const { model, licensePlate, year, color, driverId } = req.body;
  const serviceResponse = await carService.createCar({
    model, 
    licensePlate, 
    year, 
    color, 
    driverId,
  });

  if (serviceResponse.status !== 'SUCCESSFUL') {
    return res.status(400).json(serviceResponse.data);
  }
  return res.status(201).json(serviceResponse.data);
});

app.get('/cars', async (_req, res) => {
  const serviceResponse = await carService.findAll();
  if (serviceResponse.status !== 'SUCCESSFUL') {
    return res.status(400).json(serviceResponse.data);
  }
  return res.status(200).json(serviceResponse.data);
});

app.patch('/drivers/:driverId/travels/:travelId', async (req, res) => {
  const { driverId, travelId } = req.params;

  const { travelStatusId } = await travelModel.findById(travelId);
  const INCREMENT_STATUS = 1;
  const nextTravelStatusId = travelStatusId + INCREMENT_STATUS;

  await travelModel.update(nextTravelStatusId, driverId, travelId);
  const travel = await travelModel.findById(travelId);

  res.status(200).json(travel);
});

module.exports = app;