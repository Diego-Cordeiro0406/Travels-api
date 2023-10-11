const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const app = require('../../src/app');
const { driversModel } = require('../../src/models');
const { driverFromModel, driverToInsert } = require('../unit/mocks/drivers.mock');

const { expect } = chai;
chai.use(chaiHttp);

describe('Testando rota /drivers', function () {
  it('Deve ser possivel cadastrar um motorista', async function () {
    sinon.stub(driversModel, 'insert').resolves(driverFromModel);

    const response = await chai.request(app).post('/drivers')
      .send(driverToInsert);
    expect(response.status).to.be.equal(201);
  });

  it('Não deve ser possivel cadastrar um motorista sem informar um nome', async function () {
    const response = await chai.request(app).post('/drivers')
      .send();
    expect(response.status).to.be.equal(400);
  });
});