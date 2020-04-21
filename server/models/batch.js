const mongoose = require('mongoose');
const bluebird = require('bluebird');
const Schema = mongoose.Schema;

mongoose.Promise = bluebird;

const batchSchema = new Schema({
    batch: Number,
    batchDate: Date,
    createdAt: Date,
    updatedAt: Date

});

batchSchema.pre('save', function (next) {
    let currentDate = new Date();
    this.updatedAt = currentDate;

    if (!this.createdAt) {
        this.createdAt = currentDate;
    }

    next();
});

module.exports = mongoose.model('Batch', batchSchema);

