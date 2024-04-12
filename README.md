
# Travels api

Api de gerenciamento de viagens de carro.


## Stack utilizada


- Node js
- Express
- MySQL
- Joi
- Mocha, sinon e chai(testes automatizados)


## Rodando localmente

certifique-se de ter o node.js docker e docker-compose instalados

Clone o projeto

```bash
  git clone git@github.com:Diego-Cordeiro0406/Travels-api.git
```

Entre no diretório do projeto

```bash
  cd Travels-api
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  docker-compose up -d
  docker exec -it travelsapi bash
  npm run dev
```




## Fazendo requisições do tipo GET

#### Endpoint de veiculos

```http
  GET /cars
```

#### Estrutura retornada

```json
[
  {
    "id": 1,
    "model": "Renault Sandero",
    "color": "Branco",
    "licensePlate": "NCA-0956",
    "year": 2019,
    "driverId": 1
  },
  {
    "id": 2,
    "model": "Volkswagen Gol",
    "color": "Vermelho",
    "licensePlate": "DZG-4376",
    "year": 2015,
    "driverId": 2
  },
]
```

#### Endpoint de passageiros

```http
  GET /passengers
```

#### Estrutura retornada


```json
[
  {
    "id": 1,
    "name": "Doriana Quintal",
    "email": "doriana.quintal@acme.com",
    "phone": "(49) 3882-3117"
  },
  {
    "id": 2,
    "name": "Leo Sampaio",
    "email": "leo.sampaio@acme.com",
    "phone": "(66) 3692-7793"
  },
]
```

#### Endpoint de motoristas


```http
  GET /drivers
```

#### Estrutura retornada


```json
[
  {
    "id": 4,
    "name": "Samara Granjeiro"
  },
  {
    "id": 5,
    "name": "Levi Teixeira"
  }
]
```

#### Obtendo todas as viagens em aberto como motorista

```http
  GET /drivers/open/travels
```

```json
[
  {
    "id": 2,
    "driverId": null,
    "startingAddress": "Rua dos Brilhante",
    "endingAddress": "Rua do Pinheiros",
    "requestDate": "2024-04-11T19:01:05.000Z",
    "amountStop": 0
  },
  {
    "id": 3,
    "driverId": null,
    "startingAddress": "Rua da Batata",
    "endingAddress": "Rua da Goiaba",
    "requestDate": "2024-04-11T19:02:34.000Z",
    "amountStop": 0
  }
]
```

## Retornando apenas um item selecionado
#### Endpoint de veiculos
```http
  GET /cars/{carId}
```

#### Estrutura retornada

```json
{
  "id": 1,
  "model": "Renault Sandero",
  "color": "Branco",
  "licensePlate": "NCA-0956",
  "year": 2019,
  "driverId": 1
}
```
#### Endpoint de passageiros
```http
  GET /passenger/{passengerId}
```

#### Estrutura retornada

```json
{
  "id": 1,
  "name": "Doriana Quintal",
  "email": "doriana.quintal@acme.com",
  "phone": "(49) 3882-3117"
}
```

#### Endpoint de motoristas

```http
  GET /drivers/{driverId}
```

#### Estrutura retornada

```json
{
  "id": 1,
  "name": "Liana Cisneiros"
}
```

## Fazendo requisições do tipo POST

#### Inserindo um novo veiculo no endpoint de veiculos

```http
  POST /cars/
```

#### Body

```json
{
  "model": "Tesla", // modelo do veiculo(string)
  "color": "Vermelho", // cor do veiculo(string)
  "licensePlate": "NCA0965", // placa do veiculo(string)
  "year": 2019, // ano de fabricação do veiculo(number)
  "driverId": 1 // id do motorista do carro(number)
}
```

#### Inserindo um novo passageiro no endpoint de passageiros

```http
  POST /passengers/
```

#### Body

```json
{
  "name": "Joãozinho", // nome do passageiro(string)
  "email": "joaozinho@email.com", // e-mail do passageiro(string)
  "phone": "(49) 3826-7117" // telefone do passageiro(string)
}
```

#### Inserindo uma viagem como passageiro

```http
  POST /passengers/{passengerId}/request/travel
```

#### Body

```json
{
  "passengerId": 1, // id do passageiro(number)
  "startingAddress":"Rua dos Pinheiros", // endereço inicial(string)
  "endingAddress": "Rua do Brilhante",// endereço final(string)
  "waypoints": [] // pontos de parada(array vazio ou array de strings)
}
```

## Fazendo requisições do tipo PUT e PATCH

#### Atualizando um passageiro no endpoint de passageiros

```http
  PUT /passengers/{passengerId}
```

```json
{
  "name": "João", // novo nome do passageiro(string)
  "email": "joao@email.com", // novo e-mail do passageiro(string)
  "phone": "(49) 3826-7181" // novo telefone do passageiro(string)
}
```

#### Alterando status de uma viagem existente como motorista no endpoint de motoristas

```http
  PATCH /drivers/{driverId}/travels/{travelId}
```

#### Estrutura retornada

```json
{
  "id": 1, // id da viagem(number)
  "driverId": 1, // id do motorista que aceitou a viagem(number)
  "startingAddress":"Rua dos Pinheiros", // endereço inicial(string)
  "endingAddress": "Rua do Brilhante",// endereço final(string)
  "requestDate": "2024-04-11T18:19:49.000Z", // data de criação da viagem(string)
  "travelStatusId": 2, // id do status da viagem(number)
  "status": "Motorista a caminho", // novo status da corrida(string)
  "waypoints": [] // pontos de parada(array vazio ou array de strings)
}
```

## Fazendo requisições do tipo DELETE

#### Deletando no endpoint de veiculos

```http
  DELETE /cars/{carId}
```

#### Deletando no endpoint de passageiros

```http
  DELETE /passengers/{passengerId}
```

#### Deletando no endpoint de motoristas

```http
  DELETE /drivers/{driverId}
```
## Rodando os testes

Para rodar os testes certifique-se de ter seguido os passos na seção de instalação, em seguida execute o seguinte comando:

```bash
  npm test
```

