const { json } = require('micro');
const Model = require('./model');

const get = async (req, res) => {
    const playerId = req.params.id;
    if (!playerId) return;
    return await Model.get(playerId);
};

const getAll = async (req, res) => {
    return await Model.getAll();
};

const post = async (req, res) => {
    const player = await json(req);
    return Model.save(player);
};

module.exports = { post, get, getAll };
