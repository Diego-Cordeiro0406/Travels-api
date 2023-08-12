const { expect } = require('chai');
const sinon = require('sinon');
const { driversModel } = require('../../../src/models');
const { driverService } = require('../../../src/services');

const { driversFromModel,
  driversFromDB,
  driverFromDb,
  driverIdModel,
  driverFromModel,
} = require('../mocks/drivers.mock');

describe('Realizando testes - DRIVER SERVICE:', function () {
    it('Recuperando travels em aberto com sucesso', async function () {
        sinon.stub(driversModel, 'findAll').resolves(driversFromModel);
    
        const responseService = await driverService.findAll();
        expect(responseService.status).to.equal('SUCCESSFUL');
        expect(responseService.data).to.deep.equal(driversFromDB);
      });
      it('Recuperando motorista pelo id com sucesso', async function () {
        sinon.stub(driversModel, 'findById').resolves(driverFromDb);
    
        const responseService = await driverService.findById(driverFromDb);
        expect(responseService.status).to.equal('SUCCESSFUL');
        expect(responseService.data).to.deep.equal(driverFromDb);
      });
      it('Não recupera motorista pelo id caso não tenha', async function () {
        sinon.stub(driversModel, 'findAll').resolves([]);
    
        const responseService = await driverService.findAll();
        expect(responseService.status).to.equal('NOT_FOUND');
      });
      it('Inserindo motorista com sucesso', async function () {
        sinon.stub(driversModel, 'insert').resolves(driverIdModel);
        sinon.stub(driversModel, 'findById').resolves(driverFromModel);
    
        const responseService = await driverService.createDriver(driverFromModel);
        expect(responseService.status).to.equal('CREATED');
        expect(responseService.data).to.deep.equal(driverFromModel);
      });
afterEach(function () {
    sinon.restore();
  });
});