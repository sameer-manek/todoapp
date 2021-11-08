const express = require('express'),
	app = express(),
	app_config = require('./config/app.json'),
	port = app_config.port,
	session = require('express-session'),
	mongoose = require('mongoose'),
	user_routes = require('./routes/user'),
	task_routes = require('./routes/task'),
	express_layouts = require('express-ejs-layouts');

// basic express data fetching variables
app.use(express.json());
app.use(express.urlencoded());
// app.use(express.multipart());

// register static files
app.use(express.static('public'));

// register app layouts
app.use(express_layouts);

// register view engine
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main');

app.use(
	session({
		secret: app_config.session_key,
		resave: false,
		saveUninitialized: false,
	})
);

app.use(user_routes);
app.use(task_routes);

app.get('/', async function (req, res) {
	return res.render('pages/index');
});

app.listen(port, console.log('application running on port', port));
