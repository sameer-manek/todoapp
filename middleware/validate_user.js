const jwt = require('jsonwebtoken');

async function validate_user(req, res, next) {
	if (req.session.token) {
		let user = jwt.verify(req.session.token, 'shh');
		req.user = user;
		next();
	} else return res.redirect('/user/login');
}

module.exports = validate_user;
