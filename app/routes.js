const { router, get, post } = require('microrouter');
const { send } = require('micro');

const { post: recordMatch, get: getMatch } = require('./resources/matches/controller');
const { post: recordPlayer, get: getPlayer } = require('./resources/players/controller');

const health = (req, res) => 'OK';
const notfound = (req, res) => send(res, 404, 'Route not found');

const routes = router(
    get('/_health', health),
    // match
    get('/match/:id', getMatch),
    post('/match', recordMatch),
    // players
    get('/player/:id', getPlayer),
    post('/player', recordPlayer),
    // default to 404
    get('/*', notfound),
    post('/*', notfound)
);

module.exports = routes;
