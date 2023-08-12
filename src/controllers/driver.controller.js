const { travelService, driverService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const openTravels = async (_req, res) => { 
    const { status, data } = await travelService.getOpenTravels();
    if (status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(status)).json(data);
    }
  
    res.status(mapStatusHTTP(status)).json(data);
  };

const findAll = async (_req, res) => {
  const { status, data } = await driverService.findAll();
  
  if (status === 'NOT_FOUND') {
    return res.status(mapStatusHTTP(status)).json(data);
  }
  res.status(mapStatusHTTP(status)).json(data);
};

const findById = async (req, res) => {
  const { driverId } = req.params;

  const { status, data } = await driverService.findById(driverId);
  if (status === 'NOT_FOUND') {
    return res.status(404).json(data);
  }
  res.status(mapStatusHTTP(status)).json(data);
};

const createDriver = async (req, res) => {
  const driver = req.body;

  const { status, data } = await driverService.createDriver(driver);
  
  if (status !== 'CREATED') {
    return res.status(mapStatusHTTP(status)).json(data);
  }

  res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
    openTravels,
    findAll,
    findById,
    createDriver,
};