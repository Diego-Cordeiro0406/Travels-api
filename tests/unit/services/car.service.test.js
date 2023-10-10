const { expect } = require('chai');
const sinon = require('sinon');

const { carsModel } = require('../../../src/models');
const { carService } = require('../../../src/services');
const {
    carFromModel,
    carsfromModel,
    carIdModel,
    carByIdFromModel } = require('../mocks/cars.mock');

describe('Realizando testes - CAR SERVICE:', function () {
    it('Recuperando todos os carros com sucesso', async function () {
        sinon.stub(carsModel, 'findAll').resolves(carsfromModel);
    
        const responseService = await carService.findAll();
        expect(responseService.status).to.equal('SUCCESSFUL');
        expect(responseService.data).to.deep.equal(carsfromModel);
      });
    it('Não recupera carros se não tiver', async function () {
        sinon.stub(carsModel, 'findAll').resolves([]);
    
        const responseService = await carService.findAll();
        expect(responseService.status).to.equal('NOT_FOUND');
      });
    it('Recuperando carro por id com sucesso', async function () {
        sinon.stub(carsModel, 'findById').resolves(carFromModel);
    
        const responseService = await carService.findById(carIdModel);
        expect(responseService.status).to.equal('SUCCESSFUL');
        expect(responseService.data).to.deep.equal(carFromModel);
      });
    it('Não recupera carro por id se não tiver', async function () {
        sinon.stub(carsModel, 'findById').resolves([]);
    
        const responseService = await carService.findById();
        expect(responseService.status).to.equal('NOT_FOUND');
      });
    it('Inserindo carro com sucesso', async function () {
        sinon.stub(carsModel, 'insert').resolves(carIdModel);
        sinon.stub(carsModel, 'findById').resolves([]);
        sinon.stub(carsModel, 'findByPlate').resolves(false);
    
        const responseService = await carService.createCar(carFromModel);
        expect(responseService.status).to.equal('CREATED');
  
        expect(responseService.data).to.deep.equal(carByIdFromModel);
      });
    it('Não insere carro que já existe', async function () {
        sinon.stub(carsModel, 'findByPlate').resolves(carFromModel);
    
        const responseService = await carService.createCar(carFromModel);
        expect(responseService.status).to.equal('ALREADY_EXISTS');
      });
    it('Não insere carro com placa inválida', async function () {
        sinon.stub(carsModel, 'insert').resolves(carIdModel);
    
        const data = {
            id: 6,
            model: 'Palio',
            color: 'Amarelo',
            licensePlate: 'AAAAAAA',
            year: 2001,
            driverId: 1,
          };

        const responseService = await carService.createCar(data);
        expect(responseService.status).to.equal('INVALID_VALUES');
      });
    it('Não insere carro se motorista não existir', async function () {
        sinon.stub(carsModel, 'insert').resolves(carIdModel);
        sinon.stub(carsModel, 'findById').resolves(false);
    
        const data = {
            id: 6,
            model: 'Palio',
            color: 'Amarelo',
            licensePlate: 'AAAAAAA',
            year: 2001,
            driverId: 1999,
          };

        const responseService = await carService.createCar(data);
        expect(responseService.status).to.equal('NOT_FOUND');
      });
    it('Não insere carro com dados inválidos', async function () {
        sinon.stub(carsModel, 'insert').resolves(carIdModel);
    
        const data = {
            id: 6,
            model: 'Palio',
            color: 9,
            licensePlate: 'AAAAAAA',
            year: 2001,
            driverId: 1,
          };

        const responseService = await carService.createCar(data);
        expect(responseService.status).to.equal('INVALID_VALUE');
      });
      it('Deleta carro com sucesso', async function () {
        sinon.stub(carsModel, 'findById').resolves(carFromModel);
        sinon.stub(carsModel, 'deleteCar').resolves();

        const responseService = await carService.deleteCar(carIdModel);
        expect(responseService.status).to.equal('NO_CONTENT');
      });
      it('Não deleta carro se não existir', async function () {
        sinon.stub(carsModel, 'findById').resolves(null);

        const responseService = await carService.deleteCar(carIdModel);
        expect(responseService.status).to.equal('NOT_FOUND');
      });
    afterEach(function () {
      sinon.restore();
  });
});