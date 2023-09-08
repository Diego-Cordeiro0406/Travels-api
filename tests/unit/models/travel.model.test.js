const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { travelModel } = require('../../../src/models');
const {
  travelIdFromDB,
  travelIdFromModel,
  travelFromDB,
  travelFromModel,
  travelWithWaypointsFromDB,
  travelWithWaypointsFromModel,
  travelByStatusFromDB,
  travelByStatusFromModel,
} = require('../mocks/travel.mock');

describe('Realizando testes - TRAVEL MODEL:', function () {
  it('Inserindo travel sem waypoints com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([travelIdFromDB]);

    const inputData = { startingAddress: 'starting street', endingAddress: 'end street' };
    const insertId = await travelModel.insert(inputData);

    expect(insertId).to.be.a('number');
    expect(insertId).to.equal(travelIdFromModel);
  });

  it('Inserindo travel com waypoints com sucesso', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves([travelIdFromDB])
      .onSecondCall()
      .resolves(null);

    const inputData = {
      startingAddress: 'starting street',
      endingAddress: 'end street',
      waypoints: [{ address: 'middle street', stopOrder: 1 }],
    };
    const insertId = await travelModel.insert(inputData);

    expect(insertId).to.be.a('number');
    expect(insertId).to.equal(travelIdFromModel);
  });

  it('Recuperando travel por id sem waypoints com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([[travelFromDB]]);

    const inputData = 42;
    const travel = await travelModel.findById(inputData);

    expect(travel).to.be.an('object');
    expect(travel).to.be.deep.equal(travelFromModel);
  });

  it('Recuperando travel por id com waypoints com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([travelWithWaypointsFromDB]);

    const inputData = 1;
    const travel = await travelModel.findById(inputData);

    expect(travel).to.be.an('object');
    expect(travel).to.be.deep.equal(travelWithWaypointsFromModel);
  });
  it(' Não recupera travel por id se não tiver', async function () {
    sinon.stub(connection, 'execute').resolves([]);

    const inputData = 199;

    expect(await travelModel.findById(inputData)).to.be.equal(undefined);
  });

  it('Recuperando travels com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([travelByStatusFromDB]);

    const travels = await travelModel.openTravels();

    expect(travels).to.be.an('array');
    expect(travels).to.be.deep.equal(travelByStatusFromModel);
  });
  it('Atualizando uma viagem', async function () {
    sinon.stub(connection, 'execute').resolves();

    let error;
    try {
      await travelModel.update(2, 1, 1);
    } catch (err) {
      error = err;
    }

    expect(error).to.be.equal(undefined);
  });
  afterEach(function () {
    sinon.restore();
  });
});