const jwt = require("jsonwebtoken");
const userModel = require("./auth.model");

const authorize = async function (req, res, next) {
	const authHeader = req.headers.authorization;
	//Проверка на пустое поле токена
	if (!authHeader) {
		return res.status(401).send({ message: "Not authorized" });
	}
	const token = authHeader.replace("Bearer ", "");

	try {
		//Ищем есть ли в базе пользователь с таким токеном
		const result = await userModel.findOne({ token });
		//Если нет то генерируем ошибку
		if (!result) {
			throw new Error();
		}
	} catch (err) {
		return res.status(401).send({ message: "Not authorized" });
	}

	//Если пользователь есть таким токеном то вытягиваем id из токена и находим по нему юзера
	const payload = jwt.verify(token, process.env.JWT_SECRET);
	const user = await userModel.findById(payload.id);

	req.user = user;

	next();
};

const authorizeWithCookies = async function (req, res, next) {
	// 1. get jwt-token from client request +
	// 2. verify jwt token +
	// 3. fetch corresponding user from DB +
	// 4. pass user object to req. +
	// 5. pass control to next middleware +

	const token = req.cookies.token;

	try {
		const result = await userModel.findOne({ token: token });
		if (!result) {
			throw new Error();
		}
	} catch (err) {
		return res.status(401).send({ message: "Not authorized" });
	}

	const payload = jwt.verify(token, process.env.JWT_SECRET);
	const user = await userModel.findById(payload.id);

	req.user = user;

	next();
};

module.exports = {
	authorizeWithCookies,
	authorize,
};
