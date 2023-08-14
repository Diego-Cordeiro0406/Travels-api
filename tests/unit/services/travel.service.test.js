const { expect } = require('chai');
const sinon = require('sinon');
const { passengerModel, travelModel, driversModel } = require('../../../src/models');
const { travelService } = require('../../../src/services');
const { passengerFromModel } = require('../mocks/passenger.mock');
const {
  travelIdFromModel,
  travelFromModel,
  travelWithWaypointsFromModel,
  travelByStatusFromModel,
  travelAcceptedFromModel,
} = require('../mocks/travel.mock');

describe('Realizando testes - TRAVEL SERVICE:', function () {
  it('Inserindo travel sem waypoints com sucesso', async function () {
    sinon.stub(passengerModel, 'findById').resolves(passengerFromModel);
    sinon.stub(travelModel, 'insert').resolves(travelIdFromModel);
    sinon.stub(travelModel, 'findById').resolves(travelFromModel);

    const inputData = {
      passengerId: 1,
      startingAddress: 'starting street',
      endingAddress: 'end street',
    };
    const responseData = {
      id: 42,
      driverId: null,
      startingAddress: 'starting street',
      endingAddress: 'end street',
      requestDate: '2023-05-29T19:56:25.000Z',
      travelStatusId: 1,
      status: 'Aguardando Motorista',
      waypoints: [],
    };

    const responseService = await travelService.requestTravel(inputData);
    expect(responseService.status).to.equal('SUCCESSFUL');
    expect(responseService.data).to.deep.equal(responseData);
  });
  it('Inserindo travel com waypoints com sucesso', async function () {
    sinon.stub(passengerModel, 'findById').resolves(passengerFromModel);
    sinon.stub(travelModel, 'insert').resolves(travelIdFromModel);
    sinon.stub(travelModel, 'findById').resolves(travelWithWaypointsFromModel);

    const inputData = {
      passengerId: 1,
      startingAddress: 'Rua dos caramelos',
      endingAddress: 'Rua Mariana Alvarez Dutra',
      waypoints: [
        { address: 'Rua Quatro de Março', stopOrder: 1 },
        { address: 'Rua Sete de Setembro', stopOrder: 2 },
      ],
    };
    const responseData = {
      id: 1,
      driverId: null,
      startingAddress: 'Rua dos caramelos',
      endingAddress: 'Rua Mariana Alvarez Dutra',
      requestDate: '2023-05-29T19:56:52.000Z',
      travelStatusId: 1,
      status: 'Aguardando Motorista',
      waypoints: [
        { address: 'Rua Quatro de Março', stopOrder: 1 },
        { address: 'Rua Sete de Setembro', stopOrder: 2 },
      ],
    };

    const responseService = await travelService.requestTravel(inputData);
    expect(responseService.status).to.equal('SUCCESSFUL');
    expect(responseService.data.waypoints).to.have.lengthOf(2);
    expect(responseService.data).to.deep.equal(responseData);
  });
  it('Não insere travel com endereços iguais', async function () {
    const inputData = {
      passengerId: 1,
      startingAddress: 'same street',
      endingAddress: 'same street',
    };

    const responseService = await travelService.requestTravel(inputData);
    expect(responseService.status).to.equal('INVALID_VALUE');
    expect(responseService.data.message).to.equal('"endingAddress" contains an invalid value');
  });
  it('Recuperando travels em aberto com sucesso', async function () {
    sinon.stub(travelModel, 'openTravels').resolves(travelByStatusFromModel);
    const responseData = [{
      id: 1,
      driverId: null,
      startingAddress: 'Rua dos caramelos',
      endingAddress: 'Rua Mariana Alvarez Dutra',
      requestDate: '2023-05-29T19:56:52.000Z',
      amountStop: 2,
    },
    {
      id: 42,
      driverId: null,
      startingAddress: 'starting street',
      endingAddress: 'end street',
      requestDate: '2023-05-29T19:56:25.000Z',
      amountStop: 0,
    }];

    const responseService = await travelService.getOpenTravels();
    expect(responseService.status).to.equal('SUCCESSFUL');
    expect(responseService.data).to.deep.equal(responseData);
  });

  it('Não recupera travels caso não tenha', async function () {
    sinon.stub(travelModel, 'openTravels').resolves([]);

    const responseService = await travelService.getOpenTravels();
    expect(responseService.status).to.equal('NOT_FOUND');
    expect(responseService.data.message).to.equal('There are no open trips');
  });
  it('Não aceita viagem se motorista não existe', async function () {
    // Arrange => dado um cenário 
    // o motorista não é encontrado no banco
    sinon.stub(driversModel, 'findById').resolves(undefined);
    // Act => ao executar algo
    const serviceResponse = await travelService.acceptTravel({ driverId: 1, travelId: 1 });
    // Assert => espero que x aconteça
    expect(serviceResponse.status).to.be.equal('NOT_FOUND');
    expect(serviceResponse.data.message).to.be.equal('Motorista não encontrado');
  });

  it('Não aceita viagem se viagem não existe', async function () {
    // Arrange => dado um cenário 
    // a viagem não é encontrada no banco
    sinon.stub(travelModel, 'findById').resolves(undefined);
    // mas o motorista é
    sinon.stub(driversModel, 'findById').resolves({ id: 1, name: 'Motorista 1' });
    // Act => ao executar algo
    const serviceResponse = await travelService.acceptTravel({ driverId: 1, travelId: 1 });
    // Assert => espero que x aconteça
    expect(serviceResponse.status).to.be.equal('NOT_FOUND');
    expect(serviceResponse.data.message).to.be.equal('Viagem não encontrada');
  });

  it('Não aceita viagem se algum motorista já aceitou', async function () {
    // Arrange => dado um cenário 
    // motorista foi encontrado
    sinon.stub(driversModel, 'findById').resolves({ id: 1, name: 'Motorista 1' });
    // viagem foi encontrada, mas com status !== 1
    sinon.stub(travelModel, 'findById').resolves({ id: 1, travelStatusId: 2 });
    // Act => ao executar algo
    const serviceResponse = await travelService.acceptTravel({ driverId: 1, travelId: 1 });
    // Assert => espero que x aconteça
    expect(serviceResponse.status).to.be.equal('CONFLICT');
    expect(serviceResponse.data.message).to.be.equal('Viagem já em andamento');
  });

  it('Aceita viagem', async function () {
    // ARRANGE
    const updateSpy = sinon.stub(travelModel, 'update').resolves();
    // viagem foi encontrada e está em aberto (status 1)
    sinon.stub(travelModel, 'findById')
      .onFirstCall()
        .resolves({ id: 1, travelStatusId: 1 })
      .onSecondCall()
        .resolves(travelAcceptedFromModel);
    // motorista foi encontrado
    sinon.stub(driversModel, 'findById').resolves({ id: 1, name: 'Motorista 1' });
    // ACT
    const serviceResponse = await travelService.acceptTravel({ driverId: 1, travelId: 1 });
    // ASSERT
    expect(serviceResponse.status).to.be.equal('SUCCESSFUL');
    expect(serviceResponse.data).to.be.equal(travelAcceptedFromModel);

    const calls = updateSpy.getCalls();
    expect(calls).to.have.length(1);
  });
  afterEach(function () {
    sinon.restore();
  });
});