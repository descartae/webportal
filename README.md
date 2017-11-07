# Descartaê Webportal
Descartaê is an open source web portal for managing data on recycling centers and waste disposal facilities. 

## Technologies:
- Apollo
- GraphQL
- React
- Node
- Express
- MongoDB

## How to Run
To start up the applications, run `npm install` on `client` and `server` then create an `.env` file at each project's root with the values from their respective `.env.example` files. There are multiple ways to run each project - check the available commands with `npm run`.

## Docker
To run the environment with [Docker](https://docs.docker.com/) and [Docker Compose](https://docs.docker.com/compose/), the following commands may be executed on the project root:

```bash
docker build --pull -t descartae/webportal-client:latest client
docker build --pull -t descartae/webportal-server:latest server
docker-compose up
```
## How to Contribute
Check the issues list.
