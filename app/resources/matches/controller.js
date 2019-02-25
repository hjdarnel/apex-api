const { json } = require('micro');
const Model = require('./model');
const { update: updatePlayers } = require('../players/model');

const get = async (req, res) => {
    const matchId = req.params.id;
    if (!matchId) return;
    return await Model.findOne(matchId);
};

const post = async (req, res) => {
    const match = await json(req);

    const saved = await Model.save(match);
    await updatePlayers(saved);
    return saved;
};

module.exports = { post, get };
