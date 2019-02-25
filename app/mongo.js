const mongoose = require('mongoose');

const connect = async () => {
    return new Promise((resolve, reject) => {
        try {
            mongoose.connect('mongodb://localhost/apex', { useNewUrlParser: true });
            const db = mongoose.connection;

            db.on('error', console.error.bind(console, 'connection error:'));
            db.once('open', function() {
                console.log(`Connected to ${db.name} at ${db.host}:${db.port}`);
                resolve();
            });
        } catch (err) {
            console.warn('Error connecting to Mongo', err);
            reject();
            process.exit(1);
        }
    });
};

module.exports = { connect };
