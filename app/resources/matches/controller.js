const { json } = require('micro');
const Model = require('./model');
const _ = require('lodash');
const { update: updatePlayers } = require('../players/model');

const get = async (req, res) => {
    const matchId = req.params.id;
    if (!matchId) return;
    return await Model.findOne(matchId);
};

const getAll = async (req, res) => {
    return await Model.getAll();
};

const post = async (req, res) => {
    const match = await json(req);
    delete match._id;

    const saved = await Model.save(match);
    await updatePlayers(saved);
    return saved;
};

const put = async (req, res) => {
    const match = await json(req);
    const updated = _.cloneDeep(match);

    const saved = await Model.update(match);
    await updatePlayers(saved, updated);
    return saved;
};

module.exports = { post, get, getAll, put };
