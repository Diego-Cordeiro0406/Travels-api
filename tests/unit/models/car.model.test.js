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
      
      const passenger = await carsModel.findAll();
  
      expect(passenger).to.be.an('array');
      expect(passenger).to.be.deep.equal(carsfromModel);
    });
    it('Recuperando carro por id com sucesso', async function () {
        sinon.stub(connection, 'execute').resolves([[carByIdFromModel]]);
        
        const inputData = 1;
        const passenger = await carsModel.findById(inputData);
    
        expect(passenger).to.be.an('object');
        expect(passenger).to.be.deep.equal(carByIdFromModel);
      });
    it('Recuperando carro pela placa com sucesso', async function () {
        sinon.stub(connection, 'execute').resolves([[carByIdFromModel]]);
        
        const plate = 'AAA1A11';
        const passenger = await carsModel.findByPlate(plate);
    
        expect(passenger).to.be.an('object');
        expect(passenger).to.be.deep.equal(carByIdFromModel);
      });
    it('Inserindo carro com sucesso', async function () {
        sinon.stub(connection, 'execute').resolves([carIdFromDb]);
        const passenger = await carsModel.insert(carFromModel);
    
        expect(passenger).to.be.an('number');
        expect(passenger).to.be.deep.equal(carIdModel);
      });
    afterEach(function () {
        sinon.restore();
    });
});