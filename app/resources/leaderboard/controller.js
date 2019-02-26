const Player = require('../players/model');

const getKills = async (req, res) => {
    const count = req.params.count;
    if (!count) return;
    return Player.topKills(count);
};

const getWins = async (req, res) => {
    const count = req.params.count;
    if (!count) return;
    return Player.topWins(count);
};

module.exports = { getKills, getWins };
