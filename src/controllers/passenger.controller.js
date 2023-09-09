const { travelService, passengerService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const createTravel = async (req, res) => {
  const { passengerId } = req.params;
  const travelData = { passengerId, ...req.body };

  const { status, data } = await travelService.requestTravel(travelData);
  return res.status(mapStatusHTTP(status)).json(data);
};

const findAll = async (_req, res) => {
  const { status, data } = await passengerService.findAll();

  if (status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(status)).json(data);
  }
    res.status(mapStatusHTTP(status)).json(data);
};

const findById = async (req, res) => {
  const { passengerId } = req.params;
  const { status, data } = await passengerService.findById(passengerId);

  if (status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(status)).json(data);
  }

  res.status(mapStatusHTTP(status)).json(data);
};

const insert = async (req, res) => {
  const passenger = req.body;

  const { status, data } = await passengerService.insert(passenger);

  if (status !== 'CREATED') {
    return res.status(mapStatusHTTP(status)).json(data);
  }

  res.status(mapStatusHTTP(status)).json(data);
};

const updatePassenger = async (req, res) => {
  const { passengerId } = req.params;
  const updatedPassenger = req.body;

  const { status, data } = await passengerService.updatePassenger(updatedPassenger, passengerId);

  if (status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP(status)).json(data);
  }

  res.status(mapStatusHTTP(status)).json(data);
};

const deleteById = async (req, res) => {
  const { passengerId } = req.params;
  const { status, data } = await passengerService.deleteById(passengerId);

  if (status !== 'NO_CONTENT') {
    return res.status(mapStatusHTTP(status)).json(data);
  }

  return res.status(mapStatusHTTP(status)).end();
};

module.exports = {
  createTravel,
  findAll,
  findById,
  insert,
  deleteById,
  updatePassenger,
};