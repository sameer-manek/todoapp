const mongoose = require('mongoose');

const User = require('./user');
const Task = require('./task');

// todo: connect with mongoose database
// const connection = await mongoose.connect('', {});

module.exports = {
	User,
	Task,
};
