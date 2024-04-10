
# Travels api

Api de gerenciamento de viagens de carro.


## Stack utilizada


- Node js
- Express
- MySQL
- Joi
- Mocha, sinon e chai(testes automatizados)


## Documentação da API

#### Fazendo requisições do tipo GET

### Endpoint de veiculos

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

### Endpoint de passageiros

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

### Endpoint de motoristas


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

### Retornando apenas um item selecionado
### Endpoint de veiculos
```http
  GET /cars/{carId}
```

### Estrutura retornada

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
### Endpoint de passageiros
```http
  GET /passenger/{passengerId}
```

### Estrutura retornada

```json
{
  "id": 1,
  "name": "Doriana Quintal",
  "email": "doriana.quintal@acme.com",
  "phone": "(49) 3882-3117"
}
```

### Endpoint de motoristas

```http
  GET /drivers/{driverId}
```

### Estrutura retornada

```json
{
  "id": 1,
  "name": "Liana Cisneiros"
}
```
