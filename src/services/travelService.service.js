const schema = require('./validations/validationsInputValues');
const { passengerModel, travelModel, driversModel } = require('../models');

const requestTravel = async (travelDataObject) => {
  const error = schema.validateRequestTravel(travelDataObject);
  if (error) return { status: error.status, data: { message: error.message } };

  const passenger = await passengerModel.findById(travelDataObject.passengerId);
  if (!passenger) return { status: 'NOT_FOUND', data: { message: 'Passenger not found' } };

  const newTravelId = await travelModel.insert(travelDataObject);
  const newTravel = await travelModel.findById(newTravelId);
  return { status: 'SUCCESSFUL', data: newTravel };
};

const getOpenTravels = async () => {
  const WAITING_DRIVER = 1;
  const data = await travelModel.openTravels(WAITING_DRIVER);
  if (!data || data.length === 0) {
   return { status: 'NOT_FOUND', data: { message: 'There are no open trips' } };
  }
  
  return { status: 'SUCCESSFUL', data };
};

const acceptTravel = async ({ travelId, driverId }) => {
  const driver = await driversModel.findById(driverId);

  if (!driver) {
    return { status: 'NOT_FOUND', data: { message: 'Motorista não encontrado' } };
  }
  
  const travel = await travelModel.findById(travelId);

  if (!travel) {
    return { status: 'NOT_FOUND', data: { message: 'Viagem não encontrada' } };
  }

  const WAITING_FOR_DRIVER_STATUS = 1;
  if (travel.travelStatusId !== WAITING_FOR_DRIVER_STATUS) {
    return { status: 'CONFLICT', data: { message: 'Viagem já em andamento' } };
  }

  const DRIVER_ON_THE_WAY_STATUS = 2;
  await travelModel.update(travelId, { travelStatusId: DRIVER_ON_THE_WAY_STATUS, driverId });

  const updatedTravel = await travelModel.findById(travelId);

  return {
    status: 'SUCCESSFUL', data: updatedTravel,
  };
}; 

module.exports = {
  requestTravel,
  getOpenTravels,
  acceptTravel,
};