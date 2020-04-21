const mongoose = require('mongoose');
const bluebird = require('bluebird');
const Schema = mongoose.Schema;

mongoose.Promise = bluebird;

const groupSchema = new Schema({
    group: Number,
    desc: String,
    createdAt: Date,
    updatedAt: Date
});

groupSchema.pre('save', function (next) {
    let currentDate = new Date();
    this.updatedAt = currentDate;

    if (!this.createdAt) {
        this.createdAt = currentDate;
    }

    next();
});

module.exports = mongoose.model('Group', groupSchema);

