const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { driversModel } = require('../../../src/models');
const {
    driversFromDB,
    driversFromModel,
    driverFromDb,
    driverFromModel,
    driverIdFromDb,
    driverIdModel,
} = require('../mocks/drivers.mock');

describe('Realizando testes - DRIVERS MODEL:', function () {
  it('Recuperando todos os motoristas com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([driversFromDB]);
    
    const drivers = await driversModel.findAll();

    expect(drivers).to.be.an('array');
    expect(drivers).to.be.deep.equal(driversFromModel);
  });

  it('Recuperando motorista por id com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([[driverFromDb]]);
    const driverId = 1;
    const drivers = await driversModel.findById(driverId);

    expect(drivers).to.be.an('object');
    expect(drivers).to.be.deep.equal(driverFromModel);
  });

  it('Inserindo motorista com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([driverIdFromDb]);
    
    const data = { name: 'Walter White' };
    const driverInsertId = await driversModel.insert(data);

    expect(driverInsertId).to.be.an('number');
    expect(driverInsertId).to.be.equal(driverIdModel);
  });

  afterEach(function () {
    sinon.restore();
  });
});