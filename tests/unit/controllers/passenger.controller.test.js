const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { travelService, passengerService } = require('../../../src/services');
const { passengerController } = require('../../../src/controllers');
const {
  travelFromServiceCreated,
  travelFromModel,
  travelFromServiceInvalidValue,
} = require('../mocks/travel.mock');

const {
  passengersFromServiceSuccessful,
  passengersFromModel,
  passengerFromServiceNotFound,
  passengerByIdSuccesssful,
  passengerFromModel,
  passengerFromServiceCreated,
  passengerWithoutId,
  passengerFromServiceInvalidValue,
  passengerWithInvalidName,
  passengerFromServiceNoContent,
} = require('../mocks/passenger.mock');

describe('Realizando testes - PASSENGER CONTROLLER:', function () {
  it('Inserindo travel com sucesso - status 201', async function () {
    sinon.stub(travelService, 'requestTravel').resolves(travelFromServiceCreated);
    const req = {
      params: { passengerId: 1 },
      body: { startingAddress: 'starting street', endingAddress: 'end street' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await passengerController.createTravel(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(travelFromModel);
  });
  it('Não insere travel com params errado - status 422', async function () {
    sinon.stub(travelService, 'requestTravel').resolves(travelFromServiceInvalidValue);
    const req = {
    params: { passengerId: 0 },
    body: { startingAddress: 'starting street', endingAddress: 'end street' },
    };
    const res = {
    status: sinon.stub().returnsThis(),
    json: sinon.stub(),
    };
    
    await passengerController.createTravel(req, res);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
  });
  it('Não insere travel com body errado - status 422', async function () {
    sinon.stub(travelService, 'requestTravel').resolves(travelFromServiceInvalidValue);

    const req = {
      params: { passengerId: 1 },
      body: { startingAddress: 'st', endingAddress: 'en' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await passengerController.createTravel(req, res);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
  });
  it('Não insere travel com endereços iguais - status 422', async function () {
    sinon.stub(travelService, 'requestTravel').resolves(travelFromServiceInvalidValue);
    const req = {
      params: { passengerId: 1 },
      body: { startingAddress: 'starting', endingAddress: 'starting' },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await passengerController.createTravel(req, res);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
  });
  it('Recuperando todos os passageiros com sucesso - status 200', async function () {
    sinon.stub(passengerService, 'findAll').resolves(passengersFromServiceSuccessful);
    const req = {
      params: { },
      body: { },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await passengerController.findAll(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(passengersFromModel);
  });
  it('Recuperando passageiro por id com sucesso - status 200', async function () {
    sinon.stub(passengerService, 'findById').resolves(passengerByIdSuccesssful);
    const req = {
      params: { passengerId: 1 },
      body: { },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await passengerController.findById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(passengerFromModel);
  });
  it('Não recupera todos os passageiros se não tiver - status 404', async function () {
    sinon.stub(passengerService, 'findAll').resolves(passengerFromServiceNotFound);
    const req = {
      params: { },
      body: { },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await passengerController.findAll(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
  });
  it('Não recupera passageiro por id se não tiver - status 404', async function () {
    sinon.stub(passengerService, 'findById').resolves(passengerFromServiceNotFound);
    const req = {
      params: { passengerId: 199 },
      body: { },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await passengerController.findById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
  });
  it('Inserindo passageiro com sucesso - status 201', async function () {
    sinon.stub(passengerService, 'insert').resolves(passengerFromServiceCreated);
    const req = {
      params: { },
      body: passengerWithoutId,
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await passengerController.insert(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(passengerFromModel);
  });
  it('Não insere passageiro com nome inválido - status 422', async function () {
    sinon.stub(passengerService, 'insert').resolves(passengerFromServiceInvalidValue);
    const req = {
      params: { },
      body: passengerWithInvalidName,
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await passengerController.insert(req, res);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
  });
  it('Atualiza passageiro com sucesso - status 200', async function () {
    sinon.stub(passengerService, 'updatePassenger').resolves(passengerByIdSuccesssful);
    const req = {
      params: { passengerId: 1 },
      body: passengerWithoutId,
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await passengerController.updatePassenger(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(passengerFromModel);
  });
  it('Não atualiza passageiro com dados inválidos - status 422', async function () {
    sinon.stub(passengerService, 'updatePassenger').resolves(passengerFromServiceInvalidValue);
    const req = {
      params: { passengerId: 1 },
      body: passengerWithInvalidName,
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await passengerController.updatePassenger(req, res);
    expect(res.status).to.have.been.calledWith(422);
    
    expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
  });
  it('Deleta passageiro com sucesso - status 204', async function () {
    sinon.stub(passengerService, 'deleteById').resolves(passengerFromServiceNoContent);
    const req = {
      params: { passengerId: 1 },
      body: { },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
      end: sinon.stub(),
    };

    await passengerController.deleteById(req, res);
    expect(res.status).to.have.been.calledWith(204);
  });
  it('Não deleta passageiro se ele não existir - status 404', async function () {
    sinon.stub(passengerService, 'deleteById').resolves(passengerFromServiceNotFound);
    const req = {
      params: { passengerId: 199 },
      body: { },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    await passengerController.deleteById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
  });
  afterEach(function () {
    sinon.restore();
  });
});