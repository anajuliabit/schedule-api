# :calendar: schedule-api

Desafio de desenvolvimento cujo objetivo era implementar uma API para marcar eventos

## :computer: Tecnologias

- [Node](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)
- [Nest.js](https://nestjs.com/)
- [TypeORM](https://typeorm.io/#/)
- [Fastify](https://www.fastify.io/)

## :sparkles: Features

1. Autenticação com JWT
2. CRUD de eventos

## :wrench: Executando o projeto

Certifique-se de ter o [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/env-file/) instalados na sua máquina.
Na raíz do projeto execute:

```bash
$ docker-compose up
```

A aplicação ficará disponível em: [http://localhost:3000](http://localhost:3000)

## :pushpin: Todo

- [ ] Implementar testes com Jest.
- [ ] Implementar serviço para enviar emails a cada evento agendado/alterado.
