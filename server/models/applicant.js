const mongoose = require('mongoose');
const bluebird = require('bluebird');
const Schema = mongoose.Schema;

mongoose.Promise = bluebird;

const applicantSchema = new Schema({
    batch: Number,
    name: String,
    dob: Date,
    education: String,
    gender: String,
    religion: String,
    email: String,
    createdAt: Date,
    updatedAt: Date
});

applicantSchema.pre('save', function (next) {
    let currentDate = new Date();
    this.updatedAt = currentDate;

    if (!this.createdAt) {
        this.createdAt = currentDate;
    }

    next();
});


module.exports = mongoose.model('Applicant', applicantSchema);

