const mongoose = require('mongoose');
const bluebird = require('bluebird');
const Schema = mongoose.Schema;

mongoose.Promise = bluebird;
const questionSchema = new Schema({
    groupid: String,
    question: String,
    answer: String,
    createdAt: Date,
    updatedAt: Date
});

questionSchema.pre('save', function (next) {
    let currentDate = new Date();
    this.updatedAt = currentDate;

    if (!this.createdAt) {
        this.createdAt = currentDate;
    }

    next();
});

module.exports = mongoose.model('Question', questionSchema);

