const { expect } = require('chai');
const sinon = require('sinon');

const { passengerModel } = require('../../../src/models');
const { passengerService } = require('../../../src/services');

const {
    passengersFromModel,
    passengerFromModel,
    passengerIdFromModel,
  } = require('../mocks/passenger.mock');

  describe('Realizando testes - PASSENGER SERVICE:', function () {
    it('Recuperando todos os passageiros com sucesso', async function () {
        sinon.stub(passengerModel, 'findAll').resolves(passengersFromModel);
    
        const responseService = await passengerService.findAll();
        expect(responseService.status).to.equal('SUCCESSFUL');
        expect(responseService.data).to.deep.equal(passengersFromModel);
      });
      it('Não recupera passageiros se não tiver', async function () {
        sinon.stub(passengerModel, 'findAll').resolves([]);
    
        const responseService = await passengerService.findAll();
        expect(responseService.status).to.equal('NOT_FOUND');
      });
      it('Recuperando passageiro por id com sucesso', async function () {
        sinon.stub(passengerModel, 'findById').resolves(passengerFromModel);
    
        const responseService = await passengerService.findById(passengerIdFromModel);
        expect(responseService.status).to.equal('SUCCESSFUL');
        expect(responseService.data).to.deep.equal(passengerFromModel);
      });
      it('Não recupera passageiros por id se não tiver', async function () {
        sinon.stub(passengerModel, 'findById').resolves([]);
    
        const responseService = await passengerService.findById();
        expect(responseService.status).to.equal('NOT_FOUND');
      });
      it('Deletando passageiro por id com sucesso', async function () {
        sinon.stub(passengerModel, 'deleteById').resolves([]);
    
        const responseService = await passengerService.deleteById(passengerIdFromModel);
        expect(responseService.status).to.equal('NO_CONTENT');
        // expect(responseService.data).to.deep.equal(passengerFromModel);
      });
      it('Não deleta passageiros por id se não tiver', async function () {
        sinon.stub(passengerModel, 'deleteById').resolves(undefined);
        
        const passangerNotFoundId = 50;

        const responseService = await passengerService.deleteById(passangerNotFoundId);
        expect(responseService.status).to.equal('NOT_FOUND');
      });
afterEach(function () {
    sinon.restore();
  });
});