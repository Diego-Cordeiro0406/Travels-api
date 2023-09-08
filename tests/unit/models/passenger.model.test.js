const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { passengerModel } = require('../../../src/models');
const {
  passengerFromDB,
  passengerFromModel,
  passengersFromModel,
  passengerIdFromDb,
  passengerIdFromModel,
  passengerWithoutId,
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
  it('Inserindo passageiro com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([passengerIdFromDb]);
    const passenger = await passengerModel.insert(passengerFromModel);

    expect(passenger).to.be.an('number');
    expect(passenger).to.be.deep.equal(passengerIdFromModel);
  });
  it('Atualizando passageiro com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([]);
    const passenger = await passengerModel
    .updatePassenger(passengerWithoutId, passengerIdFromModel);

    expect(passenger).to.be.an('undefined');
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