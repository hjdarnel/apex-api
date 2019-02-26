const Player = require('../players/model');

const get = async (req, res) => {
    const count = req.params.count;
    if (!count) return;
    return Player.topKills(count);
};

module.exports = { get };
