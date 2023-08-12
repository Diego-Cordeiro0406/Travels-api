const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { travelService, driverService } = require('../../../src/services');
const { driverController } = require('../../../src/controllers');
const {
    travelFromServiceSuccesssful,
    travelByStatusFromModel,
    travelFromServiceNotFound,
} = require('../mocks/travel.mock');
const {
    driversFromServiceSuccesssful,
    driverFromModel,
    driversFromModel,
    driverFromServiceNotFound,
    driverByIdSuccesssful,
    driverFromServiceCreated,
    driverFromServiceInvalidValue,
} = require('../mocks/drivers.mock');

describe('Realizando testes - DRIVER CONTROLLER:', function () {
    it('Recuperando travel em aberto com sucesso - status 200', async function () {
        sinon.stub(travelService, 'getOpenTravels').resolves(travelFromServiceSuccesssful);
        const req = {
          params: { },
          body: { },
        };
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub(),
        };
    
        await driverController.openTravels(req, res);
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(travelByStatusFromModel);
      });
      it('Não recupera travel em aberto se não tiver - status 404', async function () {
        sinon.stub(travelService, 'getOpenTravels').resolves(travelFromServiceNotFound);
        const req = {
          params: { },
          body: { },
        };
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub(),
        };
    
        await driverController.openTravels(req, res);
        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
      });
      it('Recuperando todos os motoristas com sucesso - status 200', async function () {
        sinon.stub(driverService, 'findAll').resolves(driversFromServiceSuccesssful);
        const req = {
          params: { },
          body: { },
        };
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub(),
        };
    
        await driverController.findAll(req, res);
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(driversFromModel);
      });
      it('Não recupera se não tiver nenhum motorista cadastrado - status 404', async function () {
        sinon.stub(driverService, 'findAll').resolves(driverFromServiceNotFound);
        const req = {
          params: { },
          body: { },
        };
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub(),
        };
    
        await driverController.findAll(req, res);
        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
      });
      it('Recuperando motorista por id com sucesso - status 200', async function () {
        sinon.stub(driverService, 'findById').resolves(driverByIdSuccesssful);
        const req = {
          params: { driverId: 1 },
          body: { },
        };
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub(),
        };
    
        await driverController.findById(req, res);
        expect(res.status).to.have.been.calledWith(200);
        expect(res.json).to.have.been.calledWith(driverFromModel);
      });
      it('Não recupera motorista por id se não tiver - status 404', async function () {
        sinon.stub(driverService, 'findById').resolves(driverFromServiceNotFound);
        const req = {
          params: { driverId: 50 },
          body: { },
        };
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub(),
        };
    
        await driverController.findById(req, res);
        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
      });
      it('Inserindo motorista com sucesso - status 201', async function () {
        sinon.stub(driverService, 'createDriver').resolves(driverFromServiceCreated);
        const req = {
          params: { },
          body: { name: 'Rick Sanches' },
        };
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub(),
        };
    
        await driverController.createDriver(req, res);
        expect(res.status).to.have.been.calledWith(201);
        expect(res.json).to.have.been.calledWith(driverFromModel);
      });
      it('Não insere motorista com o body errado - status 422', async function () {
        sinon.stub(driverService, 'createDriver').resolves(driverFromServiceInvalidValue);
        const req = {
          params: { },
          body: { name: 'Ri' },
        };
        const res = {
          status: sinon.stub().returnsThis(),
          json: sinon.stub(),
        };
    
        await driverController.createDriver(req, res);
        expect(res.status).to.have.been.calledWith(422);
        expect(res.json).to.have.been.calledWith(sinon.match.has('message'));
      });
  afterEach(function () {
    sinon.restore();
  });
});