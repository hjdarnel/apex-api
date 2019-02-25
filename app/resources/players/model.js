const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const player = new Schema({
    name: { type: String, unique: true },
    discordId: { type: String, unique: true },
    wins: { type: Number, default: 0 },
    kills: { type: Number, default: 0 },
    matches: [{ type: Schema.Types.ObjectId, ref: 'Match' }]
});

const model = mongoose.model('Player', player);

const getByDiscordId = discordId => {
    const player = model.findOne({ discordId });
    return player;
};

const save = player => {
    const aPlayer = new model(player);
    return aPlayer.save();
};

const update = async match => {
    match.players.map(async player => {
        const stored = await model.findById(player.playerId);
        console.log(stored);
        stored.wins = stored.wins + 1;
        stored.kills = stored.kills + player.kills;
        stored.matches.push(match._id);
        stored.save();
    });

    return;
};

const get = async id => {
    console.log(id);
    return await model.findById(id);
};

module.exports = { save, update, model, get, getByDiscordId };
