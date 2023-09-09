const express = require('express');
const { travelModel } = require('./models');
const { passengerRoutes, driverRoutes, carRoute } = require('./routes');

const app = express();

app.use(express.json());
app.use('/passengers', passengerRoutes);
app.use('/drivers', driverRoutes);
app.use('/cars', carRoute);

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