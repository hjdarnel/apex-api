const { router, get, post } = require('microrouter');
const { send } = require('micro');

const {
    post: recordMatch,
    get: getMatch,
    getAll: getAllMatches
} = require('./resources/matches/controller');

const {
    post: recordPlayer,
    get: getPlayer,
    getAll: getAllPlayers
} = require('./resources/players/controller');

const { get: getLeaderboard } = require('./resources/leaderboard/controller');

const health = (req, res) => 'OK';
const notfound = (req, res) => send(res, 404, 'Route not found');

const routes = router(
    get('/_health', health),
    // match
    get('/match/:id', getMatch),
    get('/match', getAllMatches),
    post('/match', recordMatch),
    // players
    get('/player/:id', getPlayer),
    get('/player', getAllPlayers),
    post('/player', recordPlayer),
    // leaderboard
    get('/leaderboard/:count', getLeaderboard),
    // default to 404
    get('/*', notfound),
    post('/*', notfound)
);

module.exports = routes;
