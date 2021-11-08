const session = require('express-session');

const express = require('express'),
	jwt = require('jsonwebtoken'),
	validate_user = require('../middleware/validate_user'),
	router = express.Router();

// TEMP CACHE TO KEEP CHECK ON USERS

let user_data = [];

router.get('/user/register', async function (req, res) {
	if (req.session.token) {
		// user is already logged in. forward to profile
		return res.redirect('/user/profile');
	}

	return res.render('pages/register', { failed: false });
});

router.get('/user/login', async function (req, res) {
	if (req.session.token) {
		// redirect user to profile if already logged in
		// todo: check if the session token is valid
		return res.redirect('/user/profile');
	}

	return res.render('pages/login', { failed: false });
});

router.post('/user/register', async function (req, res) {
	if (req.session.token) {
		// user is already logged in. forward to profile
		return res.redirect('/user/profile');
	}

	const { email, name, password } = req.body;

	if (
		name &&
		name !== '' &&
		email &&
		email !== '' &&
		password &&
		password !== ''
	) {
		let user_check = user_data.find((user) => user.email === email);

		if (user_check) {
			return res.render('pages/register', {
				failed: true,
				message: 'A user has already registered with that Email.',
			});
		} else {
			user_data.push({
				name,
				email,
				password,
			});

			return res.render('pages/register', {
				failed: false,
				success: true,
				message: 'You are now a user! Please login to continue.',
			});
		}
	}

	return res.render('pages/register', {
		failed: true,
		message: 'Invalid data. Make sure you filled up all the fields',
	});
});

router.post('/user/login', async function (req, res) {
	const session = req.session;
	if (session.token) {
		return res.redirect('/user/profile');
	}

	const { email, password } = req.body;

	let user = user_data.find(
		(u) => u.email === email && u.password === password
	);

	if (user) {
		session.token = jwt.sign({ email, name: user.name }, 'shh');
		session.save();

		return res.redirect('/user/profile');
	} else {
		return res.render('pages/login', { failed: true });
	}
});

router.get('/user/profile', validate_user, async function (req, res) {
	let user = req.user;
	if (user && user.name && user.email) {
		return res.render('pages/profile', {
			name: user.name,
			email: user.email,
		});
	} else {
		console.log({ user });
		return res.send('welcome to profile sameer');
	}
});

router.get('/user/logout', validate_user, async function (req, res) {
	delete req.session.token;
	req.session.save();
	res.redirect('/user/login');
});

module.exports = router;
