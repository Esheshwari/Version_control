// Simple authorization helpers. Expand as needed.
function authorizeSelfOrAdmin(req, res, next) {
	// For now, allow if the token user id matches the :id param
	const userId = req.user && req.user.id;
	const paramId = req.params.id || req.params.userID || req.params.userId;

	if (!userId) return res.status(401).json({ message: 'Unauthorized' });

	if (paramId && userId.toString() !== paramId.toString()) {
		return res.status(403).json({ message: 'Forbidden' });
	}

	next();
}

module.exports = { authorizeSelfOrAdmin };
