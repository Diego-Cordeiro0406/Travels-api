const { expect } = require('chai');
const sinon = require('sinon');
const { driversModel } = require('../../../src/models');
const { driverService } = require('../../../src/services');

const { driversFromModel,
  driversFromDB,
  driverFromDb,
  driverIdModel,
  driverFromModel,
  driverIdFromDb,
} = require('../mocks/drivers.mock');

describe('Realizando testes - DRIVER SERVICE:', function () {
    it('Recuperando travels em aberto com sucesso', async function () {
        sinon.stub(driversModel, 'findAll').resolves(driversFromModel);
    
        const responseService = await driverService.findAll();
        expect(responseService.status).to.equal('SUCCESSFUL');
        expect(responseService.data).to.deep.equal(driversFromDB);
      });
      it('Não recupera motorista caso não tenha', async function () {
        sinon.stub(driversModel, 'findAll').resolves([]);
    
        const responseService = await driverService.findAll();
        expect(responseService.status).to.equal('NOT_FOUND');
      });
      it('Recuperando motorista pelo id com sucesso', async function () {
        sinon.stub(driversModel, 'findById').resolves(driverFromDb);
    
        const responseService = await driverService.findById(driverFromDb);
        expect(responseService.status).to.equal('SUCCESSFUL');
        expect(responseService.data).to.deep.equal(driverFromDb);
      });
      it('Não recupera motorista pelo id caso não tenha', async function () {
        sinon.stub(driversModel, 'findById').resolves([]);
    
        const responseService = await driverService.findById();
        expect(responseService.status).to.equal('NOT_FOUND');
      });
      it('Inserindo motorista com sucesso', async function () {
        sinon.stub(driversModel, 'insert').resolves(driverIdModel);
        sinon.stub(driversModel, 'findById').resolves(driverFromModel);
    
        const responseService = await driverService.createDriver(driverFromModel);
        expect(responseService.status).to.equal('CREATED');
        expect(responseService.data).to.deep.equal(driverFromModel);
      });
      it('Não insere motorista com dados inválidos', async function () {
        sinon.stub(driversModel, 'insert').resolves(driverIdFromDb);
    
        const data = {
          id: 1,
          name: 9,
          };

        const responseService = await driverService.createDriver(data);
        expect(responseService.status).to.equal('INVALID_VALUE');
      });
afterEach(function () {
    sinon.restore();
  });
});