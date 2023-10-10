const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { carsModel } = require('../../../src/models');
const {
    carsfromModel,
    carIdFromDb,
    carFromModel,
    carIdModel,
    carByIdFromModel,
} = require('../mocks/cars.mock');

describe('Realizando testes - CAR MODEL:', function () {
    it('Recuperando todos os carros com sucesso', async function () {
      sinon.stub(connection, 'execute').resolves([carsfromModel]);
      
      const car = await carsModel.findAll();
  
      expect(car).to.be.an('array');
      expect(car).to.be.deep.equal(carsfromModel);
    });
    it('Recuperando carro por id com sucesso', async function () {
        sinon.stub(connection, 'execute').resolves([[carByIdFromModel]]);
        
        const inputData = 1;
        const car = await carsModel.findById(inputData);
    
        expect(car).to.be.an('object');
        expect(car).to.be.deep.equal(carByIdFromModel);
      });
    it('Recuperando carro pela placa com sucesso', async function () {
        sinon.stub(connection, 'execute').resolves([[carByIdFromModel]]);
        
        const plate = 'AAA1A11';
        const car = await carsModel.findByPlate(plate);
    
        expect(car).to.be.an('object');
        expect(car).to.be.deep.equal(carByIdFromModel);
      });
    it('Inserindo carro com sucesso', async function () {
        sinon.stub(connection, 'execute').resolves([carIdFromDb]);
        const car = await carsModel.insert(carFromModel);
    
        expect(car).to.be.an('number');
        expect(car).to.be.deep.equal(carIdModel);
      });
      it('Deletando carro com sucesso', async function () {
        sinon.stub(connection, 'execute').resolves();
        const car = await carsModel.deleteCar(carIdModel);
    
        expect(car).to.be.an('undefined');
      });
    afterEach(function () {
        sinon.restore();
    });
});