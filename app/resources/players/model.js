const mongoose = require('mongoose');
const _ = require('lodash');

const Schema = mongoose.Schema;

const player = new Schema({
    name: { type: String, required: true, unique: true },
    discordId: { type: String, required: true, unique: true },
    wins: { type: Number, default: 0 },
    kills: { type: Number, default: 0 },
    matches: [{ type: Schema.Types.ObjectId, ref: 'Match' }]
});

const model = mongoose.models.Player || mongoose.model('Player', player);

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
        stored.wins = stored.wins + 1;
        stored.kills = stored.kills + player.kills;
        stored.matches.push(match._id);
        stored.save();
    });

    return;
};

const get = async id => {
    const player = await model
        .findById(id)
        .populate('matches')
        .exec();

    player.kills = 0;
    player.matches.map(match => {
        match.players.map(record => {
            if (record.playerId.toString() === player._id.toString()) {
                player.kills = player.kills + record.kills;
            }
        });
    });

    player.wins = player.matches.length;
    player.save();
    return player;
};

const getAll = async () => {
    const players = await model
        .find({})
        .populate('matches')
        .exec();

    players.map(player => {
        player.kills = 0;
        player.matches.map(match => {
            match.players.map(record => {
                if (record.playerId.toString() === player._id.toString()) {
                    player.kills = player.kills + record.kills;
                }
            });
        });
        player.wins = player.matches.length;

        player.save();
    });

    return players;
};

const topKills = async count => {
    const players = await model
        .find({})
        .populate('matches')
        .exec();

    players.map(player => {
        player.kills = 0;
        player.matches.map(match => {
            match.players.map(record => {
                if (record.playerId.toString() === player._id.toString()) {
                    player.kills = player.kills + record.kills;
                }
            });
        });
        player.wins = player.matches.length;

        player.save();
    });

    return _.sortBy(players, 'kills')
        .reverse()
        .slice(0, count);
};

const topWins = async count => {
    const players = await model
        .find({})
        .sort('-wins')
        .populate('matches')
        .exec();

    return players.slice(0, count);
};

module.exports = { save, update, model, get, getByDiscordId, getAll, topKills, topWins };
