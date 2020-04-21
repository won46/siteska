const mongoose = require('mongoose');
const bluebird = require('bluebird');
const Schema = mongoose.Schema;

mongoose.Promise = bluebird;

const userSchema = new Schema({
    name: String,
    deptId: String,
    sectId: String,
    username: String,
    password: String,
    roleId: String,
    createdAt: Date,
    updatedAt: Date
});

userSchema.pre('save', function (next) {
    let currentDate = new Date();
    this.updatedAt = currentDate;

    if (!this.createdAt) {
        this.createdAt = currentDate;
    }

    next();
});

module.exports = mongoose.model('User', userSchema);

