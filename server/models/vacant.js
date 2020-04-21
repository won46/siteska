const mongoose = require('mongoose');
const bluebird = require('bluebird');
const Schema = mongoose.Schema;

mongoose.Promise = bluebird;

const sectSchema = new Schema({
    batchId: String ,
    deptId: String ,
    sectId: String ,
    persons: Number,
    createdAt: Date,
    updatedAt: Date
});

sectSchema.pre('save', function (next) {
    let currentDate = new Date();
    this.updatedAt = currentDate;

    if (!this.createdAt) {
        this.createdAt = currentDate;
    }

    next();
});

module.exports = mongoose.model('Sect', sectSchema);

