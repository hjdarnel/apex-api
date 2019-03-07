# apex-api 💥🔫🎮 [![CircleCI](https://circleci.com/gh/hjdarnel/apex-api.svg?style=svg)](https://circleci.com/gh/hjdarnel/apex-api)
A server serving requests to store records in Mongo using [Mongoose](https://mongoosejs.com/docs/guide.html) for schema management.

Uses [micro](https://github.com/zeit/micro), [micro-dev](https://github.com/zeit/micro-dev), [micro-router](https://github.com/pedronauck/micro-router) for routing, [ESLint](https://github.com/eslint/eslint) for code linting, and [Prettier](https://github.com/prettier/prettier) for code cleanup.

**📖 index**
- [apex-api 💥🔫🎮](#apex-api--)
  - [💻 install](#-install)
  - [📖 api](#-api)
  - [👓 deploying](#-deploying)

## 💻 install
```bash
git clone https://github.com/hjdarnel/apex-api.git
cd apex-api
npm install

# start hot-reloading server
npm run dev
```

Ideally you would run this in a Docker Compose environment. Below is an example `docker-compose.yml` file. Place this in the parent directory of this repository for proper volume mounting for local dev.

```yml
version: '2'
services:
  apex-api:
    image: hjdarnel/apex-api:master
    command: 'npm run dev'
    ports:
      - '3000:3000' # expose port 3000 on local port 3000
    volumes:
      - './apex-api:/opt/apex:cached'
  mongo:
    image: 'mongo:3.6.10'
    restart: always
    ports:
      - '50001:27017' # export 50001 for Mongo gui clients
```

## 📖 api
```js

    GET /_health => "OK" // health check route

    GET /player/:id => Player[]                   // get player by id
    GET /player => Player[]                       // get all players
    POST /player  |PlayerCreateRequest| => Player // create player

    GET /match/:id => Match[]                     // get match by id
    GET /match => Match[]                         // get all matches
    POST /match  |MatchCreateRequest| => Match    // create match

    GET /leaderboard/wins/:count => Player[]           // get top count wins
    GET /leaderboard/kills/:count => Player[]           // get top count kills

    interface Player {
        name: String
        discordId: String
        wins: Number
        kills: Number
        matches: [ObjectId]
    }

    interface Match {
        created: Date
        players: [KillRecord]
        image: String
    }


    interface PlayerCreateRequest {
        name: String         // required, unique
        discordId: String    // required, unique
        wins: Number         // defaults to 0
        kills: Number        // defaults to 0
        matches: [ObjectId]  // defaults to empty array, refers to _id of Matches
    }

    interface KillRecord {
        playerId: ObjectId   // required, refers to _id of Player
        kills: Number        // defaults to 0
    }

    interface MatchCreateRequest {
        created: Date           // default: Date.now, format 2019-02-25T09:36:47.715Z
        players: [KillRecord]   // defaults to empty
        image: String           // url
    }
```

## 👓 deploying

This project is built by [Travis CI](https://travis-ci.com/hjdarnel/apex-api) on every branch push. This updates the [Docker Hub repository](https://hub.docker.com/r/hjdarnel/apex-api) with an updated image, tagged with the branch name.

It would be sufficient to use a Docker Compose setup to run this, since it's not mission critical. Consider using Docker's [healthcheck](https://docs.docker.com/compose/compose-file/compose-file-v2/#healthcheck) and a `restart` policy to keep the server running.
