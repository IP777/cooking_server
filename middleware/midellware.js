require("dotenv").config();

const isAdmin = async function (req, res, next) {
	const { password } = req.params;

	if (password !== process.env.ADMIN_PASSWORD) {
		return res.status(401).send({ error: "Password is not valid!" });
	}

	next();
};

module.exports = {
	isAdmin,
};
