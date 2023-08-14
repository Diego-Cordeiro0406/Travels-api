const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { passengerModel } = require('../../../src/models');
const {
  passengerFromDB,
  passengerFromModel,
  passengersFromModel,
} = require('../mocks/passenger.mock');

describe('Realizando testes - PASSENGER MODEL:', function () {
  it('Recuperando passageiro por id com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([[passengerFromDB]]);
    
    const inputData = 1;
    const passenger = await passengerModel.findById(inputData);

    expect(passenger).to.be.an('object');
    expect(passenger).to.be.deep.equal(passengerFromModel);
  });
  it('Recuperando todos os passageiros com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([passengersFromModel]);
    
    const passenger = await passengerModel.findAll();

    expect(passenger).to.be.an('array');
    expect(passenger).to.be.deep.equal(passengersFromModel);
  });
  it('Deletando passageiro com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves(undefined);
    
    const passenger = await passengerModel.deleteById();

    expect(passenger).to.be.an('undefined');
    // expect(passenger).to.be.deep.equal(passengersFromModel);
  });
  afterEach(function () {
    sinon.restore();
  });
});