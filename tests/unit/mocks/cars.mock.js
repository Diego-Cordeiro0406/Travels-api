const carIdFromDb = { insertId: 6 }
const carIdModel = 6;

const carsfromModel = [
    {
      id: 1,
      model: "Renault Sandero",
      color: "Branco",
      licensePlate: "NCA-0956",
      year: 2019,
      driverId: 1
    },
    {
      id: 2,
      model: "Volkswagen Gol",
      color: "Vermelho",
      licensePlate: "DZG-4376",
      year: 2015,
      driverId: 2
    },
    {
      id: 3,
      model: "Chevrolet Onix",
      color: "Prata",
      licensePlate: "KBJ-2899",
      year: 2020,
      driverId: 3
    },
    {
      id: 4,
      model: "Renault Logan",
      color: "Azul",
      licensePlate: "NFA-9035",
      year: 2019,
      driverId: 4
    },
    {
      id: 5,
      model: "Fiat Siena",
      color: "Cinza",
      licensePlate: "HTH-9177",
      year: 2017,
      driverId: 5
    }
  ]

const carFromModel = {
    model: "Palio",
    color: "Amarelo",
    licensePlate: "AAA1A11",
    year: 2001,
    driverId: 1
  }

const carByIdFromModel = {
    id: 6,
    model: "Palio",
    color: "Amarelo",
    licensePlate: "AAA1A11",
    year: 2001,
    driverId: 1
  }

const carsFromServiceSuccessful = {
    status: 'SUCCESSFUL',
    data: carsfromModel,
  };
const carByIdSuccesssful = {
    status: 'SUCCESSFUL',
    data: carByIdFromModel,
  };
const carsFromServiceNotFound = {
    status: 'NOT_FOUND',
    data: { message: 'message' },
  };
const carFromServiceDelete = {
    status: 'NO_CONTENT',
  };

module.exports = {
  carsfromModel,
  carIdFromDb,
  carIdModel,
  carFromModel,
  carByIdFromModel,
  carsFromServiceSuccessful,
  carByIdSuccesssful,
  carsFromServiceNotFound,
  carFromServiceDelete,
}