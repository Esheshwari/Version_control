const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

function authMiddleware(req, res, next) {
	const authHeader = req.headers['authorization'] || req.headers['Authorization'];
	if (!authHeader) return res.status(401).json({ message: 'No token provided' });

	const parts = authHeader.split(' ');
	if (parts.length !== 2 || parts[0] !== 'Bearer') {
		return res.status(401).json({ message: 'Invalid authorization header' });
	}

	const token = parts[1];
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
		req.user = { id: decoded.id };
		next();
	} catch (err) {
		return res.status(401).json({ message: 'Invalid or expired token' });
	}
}

module.exports = authMiddleware;
