const mongoose = require('mongoose');
const bluebird = require('bluebird');
const Schema = mongoose.Schema;

mongoose.Promise = bluebird;

const deptSchema = new Schema({
    dept: String,
    createdAt: Date,
    updatedAt: Date
});

deptSchema.pre('save', function (next) {
    let currentDate = new Date();
    this.updatedAt = currentDate;

    if (!this.createdAt) {
        this.createdAt = currentDate;
    }

    next();
});

module.exports = mongoose.model('Dept', deptSchema);

