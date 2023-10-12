const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');
const app = require('../../src/app');
const {
  travelToInsert,
  travelWithInvalidWaypointsToInsert,
  travelInvalidToInsert,
  travelWithEmptyWaypoints,
} = require('../unit/mocks/travel.mock');

const { expect } = chai;
chai.use(chaiHttp);

describe('Testando rota /drivers', function () {
  it('Deve ser possivel cadastrar uma viagem', async function () {
    const response = await chai.request(app).post('/passengers/1/request/travel')
      .send(travelToInsert);
    expect(response.status).to.be.equal(201);
  });
  it('Não deve ser possivel criar com dados inválidos', async function () {
    const response = await chai.request(app).post('/passengers/1/request/travel')
      .send(travelInvalidToInsert);
    expect(response.status).to.be.equal(400);
  });
  it('Não deve ser possivel criar com waypoint vazio', async function () {
    const response = await chai.request(app).post('/passengers/1/request/travel')
      .send(travelWithEmptyWaypoints);
    expect(response.status).to.be.equal(422);
  });
  it('Caso tenha waypoints inválidos não deve ser possivel criar', async function () {
    const response = await chai.request(app).post('/passengers/1/request/travel')
      .send(travelWithInvalidWaypointsToInsert);
    expect(response.status).to.be.equal(400);
  });
  afterEach(function () {
    sinon.restore();
  });
});