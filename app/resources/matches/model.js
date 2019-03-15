const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const match = new Schema({
    created: { type: Date, default: Date.now },
    players: [
        {
            playerId: { type: Schema.Types.ObjectId, ref: 'Player', required: true },
            kills: { type: Number, min: 0, default: 0 },
            damage: { type: Number, min: 0, default: 0 }
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

const getAll = async () => {
    return await model.find({});
};

const update = async match => {
    return await model.findOneAndUpdate({ _id: match._id }, match);
};

module.exports = { save, model, findOne, getAll, update };
