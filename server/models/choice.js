const mongoose = require('mongoose');
const bluebird = require('bluebird');
const Schema = mongoose.Schema;

mongoose.Promise = bluebird;

const choiceSchema = new Schema({
    choice_1: String,
    choice_2: String,
    choice_3: String,
    choice_4: String,
    choice_5: String,
    questionid: String,
    createdAt: Date,
    updatedAt: Date
});

choiceSchema.pre('save', function (next) {
    let currentDate = new Date();
    this.updatedAt = currentDate;

    if (!this.createdAt) {
        this.createdAt = currentDate;
    }

    next();
});


module.exports = mongoose.model('Choice', choiceSchema);

