const express = require('express'),
	jwt = require('jsonwebtoken'),
	validate_user = require('../middleware/validate_user'),
	router = express.Router();

let task_data = {};

router.post('/task/create', validate_user, async function (req, res) {
	const { title, desc, due_date } = req.body;

	if (
		!title ||
		title === '' ||
		!desc ||
		desc === '' ||
		!due_date ||
		due_date === ''
	) {
		return res.send({
			success: false,
			message:
				'Failed to create task - Invalid data. Please check if you filled all the fields',
		});
	}

	let user_email = req.user.user_email;
	let task = {
		title,
		desc,
		due_date,
		completed: false,
	};

	task_data[user_email] = task;

	return res.send({
		success: true,
		message: 'Task created successfully!',
	});
});

module.exports = router;
