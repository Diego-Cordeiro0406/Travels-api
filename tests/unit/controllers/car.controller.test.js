const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { carService } = require('../../../src/services');
const { carController } = require('../../../src/controllers');
const {
  carsfromModel,
  carsFromServiceSuccessful,
  carsFromServiceNotFound,
  carByIdSuccesssful,
  carByIdFromModel,
  carFromServiceDelete,
} = require('../mocks/cars.mock');

describe('Realizando testes - CAR CONTROLLER:', function () {
  it('Recuperando carros com sucesso - status 200', async function () {
      sinon.stub(carService, 'findAll').resolves(carsFromServiceSuccessful);
      const req = {
        params: { },
        body: { },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
  
      await carController.findAll(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(carsfromModel);
    });
  it('Não recupera carros se não tiver - status 404', async function () {
      sinon.stub(carService, 'findAll').resolves(carsFromServiceNotFound);
      const req = {
        params: { },
        body: { },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
  
      await carController.findAll(req, res);
      expect(res.status).to.have.been.calledWith(404);
    });
  it('Recuperando carro por id com sucesso - status 200', async function () {
      sinon.stub(carService, 'findById').resolves(carByIdSuccesssful);
      const req = {
        params: { carId: 1 },
        body: { },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
  
      await carController.findById(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(carByIdFromModel);
    });
  it('Não recupera carro por id se não tiver - status 404', async function () {
      sinon.stub(carService, 'findById').resolves(carsFromServiceNotFound);
      const req = {
        params: { carId: 100 },
        body: { },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
  
      await carController.findById(req, res);
      expect(res.status).to.have.been.calledWith(404);
    });
  it('Deleta carro com sucesso - status 204', async function () {
      sinon.stub(carService, 'deleteCar').resolves(carFromServiceDelete);
      const req = {
        params: { carId: 1 },
        body: { },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
  
      await carController.deleteCar(req, res);
      expect(res.status).to.have.been.calledWith(204);
    });
  it('Nao deleta carro se não tiver - status 404', async function () {
      sinon.stub(carService, 'deleteCar').resolves(carsFromServiceNotFound);
      const req = {
        params: { carId: 1 },
        body: { },
      };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
  
      await carController.deleteCar(req, res);
      expect(res.status).to.have.been.calledWith(404);
    });
    afterEach(function () {
      sinon.restore();
    });
  });