const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const match = new Schema({
    created: { type: Date, default: Date.now },
    players: [
        {
            playerId: { type: Schema.Types.ObjectId, ref: 'Player' },
            kills: Number
        }
    ],
    image: String
});

const model = mongoose.models.Match || mongoose.model('Match', match);

const save = match => {
    let aMatch = new model(match);
    return aMatch.save();
};

const findOne = async id => {
    return await model.findById(id);
};

module.exports = { save, model, findOne };
