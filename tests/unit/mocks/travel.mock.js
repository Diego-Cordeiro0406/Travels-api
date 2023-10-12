const travelIdFromDB = { insertId: 42 };
const travelIdFromModel = 42;



const travelFromDB = {
  id: 42,
  driver_id: null,
  starting_address: 'starting street',
  ending_address: 'end street',
  request_date: '2023-05-29T19:56:25.000Z',
  travel_status_id: 1,
  status: 'Aguardando Motorista',
  address: null,
  stop_order: null,
};
const travelFromModel = {
  id: 42,
  driverId: null,
  startingAddress: 'starting street',
  endingAddress: 'end street',
  requestDate: '2023-05-29T19:56:25.000Z',
  travelStatusId: 1,
  status: 'Aguardando Motorista',
  waypoints: [],
};

const travelToInsert = {
  startingAddress: "starting street",
  endingAddress: "end street"
}

const travelInvalidToInsert = {
  potato: "starting street",
  papaya: "end street"
}

const travelWithInvalidWaypointsToInsert = {
  startingAddress: "starting street",
  endingAddress: "end street",
  waypoints: [
    { batata: "Rua Quatro de Março", stopOrder: 1 },
    { address: "Rua Sete de Setembro", stopOrder: 2 }
  ]
}

const travelWithEmptyWaypoints = {
  startingAddress: "starting street",
  endingAddress: "end street",
  waypoints: [
    { address: "", stopOrder: 1 },
  ]
}



const travelWithWaypointsFromDB = [
  {
    id: 1,
    driver_id: null,
    starting_address: 'Rua dos caramelos',
    ending_address: 'Rua Mariana Alvarez Dutra',
    request_date: '2023-05-29T19:56:52.000Z',
    travel_status_id: 1,
    status: 'Aguardando Motorista',
    address: 'Rua Quatro de Março',
    stop_order: 1,
  },
  {
    id: 1,
    driver_id: null,
    starting_address: 'Rua dos caramelos',
    ending_address: 'Rua Mariana Alvarez Dutra',
    request_date: '2023-05-29T19:56:52.000Z',
    travel_status_id: 1,
    status: 'Aguardando Motorista',
    address: 'Rua Sete de Setembro',
    stop_order: 2,
  },
];
const travelWithWaypointsFromModel = {
  id: 1,
  driverId: null,
  startingAddress: 'Rua dos caramelos',
  endingAddress: 'Rua Mariana Alvarez Dutra',
  requestDate: '2023-05-29T19:56:52.000Z',
  travelStatusId: 1,
  status: 'Aguardando Motorista',
  waypoints: [
    { address: 'Rua Quatro de Março', stopOrder: 1 },
    { address: 'Rua Sete de Setembro', stopOrder: 2 },
  ],
};



const travelByStatusFromDB = [
  {
    id: 1,
    driver_id: null,
    starting_address: 'Rua dos caramelos',
    ending_address: 'Rua Mariana Alvarez Dutra',
    request_date: '2023-05-29T19:56:52.000Z',
    amount_stop: 2,
  },
  {
    id: 42,
    driver_id: null,
    starting_address: 'starting street',
    ending_address: 'end street',
    request_date: '2023-05-29T19:56:25.000Z',
    amount_stop: 0,
  },
];
const travelByStatusFromModel = [
  {
    id: 1,
    driverId: null,
    startingAddress: 'Rua dos caramelos',
    endingAddress: 'Rua Mariana Alvarez Dutra',
    requestDate: '2023-05-29T19:56:52.000Z',
    amountStop: 2,
  },
  {
    id: 42,
    driverId: null,
    startingAddress: 'starting street',
    endingAddress: 'end street',
    requestDate: '2023-05-29T19:56:25.000Z',
    amountStop: 0,
  },
];

const travelAcceptedFromModel = {
  id: 1,
  driverId: 1,
  startingAddress: 'starting street',
  endingAddress: 'end street',
  requestDate: '2023-05-29T19:56:25.000Z',
  travelStatusId: 2,
  status: 'Aguardando Motorista',
  waypoints: [],
}


const travelFromServiceSuccessful = {
  status: 'SUCCESSFUL',
  data: travelByStatusFromModel,
};
const travelFromServiceCreated = {
  status: 'CREATED',
  data: travelFromModel,
};
const travelFromServiceInvalidValue = {
  status: 'INVALID_VALUE',
  data: { message: 'message' },
};
const travelFromServiceNotFound = {
  status: 'NOT_FOUND',
  data: { message: 'message' },
};
const travelFromServiceConflict = {
  status: 'CONFLICT',
  data: { message: 'message' },
};

module.exports = {
  travelIdFromDB,
  travelIdFromModel,
  travelFromDB,
  travelFromModel,
  travelWithWaypointsFromDB,
  travelWithWaypointsFromModel,
  travelByStatusFromDB,
  travelByStatusFromModel,
  travelAcceptedFromModel,
  travelFromServiceSuccessful,
  travelFromServiceCreated,
  travelFromServiceInvalidValue,
  travelFromServiceNotFound,
  travelToInsert,
  travelWithInvalidWaypointsToInsert,
  travelInvalidToInsert,
  travelWithEmptyWaypoints,
};