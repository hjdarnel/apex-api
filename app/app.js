const routes = require('./routes');
const { connect } = require('./mongo');

connect();

module.exports = routes;
