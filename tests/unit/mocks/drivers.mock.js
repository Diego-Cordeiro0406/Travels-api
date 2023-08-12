const driverIdFromDb = { insertId: 10 }
const driverIdModel = 10;

const driversFromDB = [
    {
      "id": 1,
      "name": "Liana Cisneiros"
    },
    {
      "id": 2,
      "name": "FÃ¡bio FrazÃ£o"
    },
    {
      "id": 3,
      "name": "AnastÃ¡cia Bicalho"
    },
    {
      "id": 4,
      "name": "Samara Granjeiro"
    },
    {
      "id": 5,
      "name": "Levi Teixeira"
    }
  ]

const driversFromModel = [
    {
      "id": 1,
      "name": "Liana Cisneiros"
    },
    {
      "id": 2,
      "name": "FÃ¡bio FrazÃ£o"
    },
    {
      "id": 3,
      "name": "AnastÃ¡cia Bicalho"
    },
    {
      "id": 4,
      "name": "Samara Granjeiro"
    },
    {
      "id": 5,
      "name": "Levi Teixeira"
    }
  ]

const driverFromDb = {
      "id": 1,
      "name": "Liana Cisneiros"
}

const driverFromModel = {
      "id": 1,
      "name": "Liana Cisneiros"
}

const driverByIdSuccesssful = {
  status: 'SUCCESSFUL',
  data: driverFromModel,
};

const driversFromServiceSuccesssful = {
  status: 'SUCCESSFUL',
  data: driversFromModel,
};
const driverFromServiceCreated = {
  status: 'CREATED',
  data: driverFromModel,
};
const driverFromServiceInvalidValue = {
  status: 'INVALID_VALUE',
  data: { message: 'message' },
};
const driverFromServiceNotFound = {
  status: 'NOT_FOUND',
  data: { message: 'message' },
};
const driverFromServiceConflict = {
  status: 'CONFLICT',
  data: { message: 'message' },
};

  module.exports = {
    driversFromDB,
    driversFromModel,
    driverFromDb,
    driverFromModel,
    driverIdFromDb,
    driverIdModel,
    driversFromServiceSuccesssful,
    driverFromServiceCreated,
    driverFromServiceInvalidValue,
    driverFromServiceNotFound,
    driverFromServiceConflict,
    driverByIdSuccesssful,
  };