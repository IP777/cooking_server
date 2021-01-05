const User = require("./auth.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function getAllUsers(req, res, next) {
	try {
		const userList = await User.find();
		res.status(200).send(userList);
	} catch (err) {
		next(err);
	}
}

async function findUser(req, res, next) {
	const { id } = req.params;
	try {
		const getUser = await User.find({ _id: id });
		res.status(200).send(getUser);
	} catch (err) {
		next(err);
	}
}

async function addUser(req, res, next) {
	const { email, name, password } = req.body;
	try {
		const hashPassword = await bcrypt.hash(password, 10);

		const findUser = await User.findOne({ email });
		if (findUser) {
			res.status(401).send(`Тaкой ${email} существует`);
		}

		const createUser = new User({
			email,
			name,
			password: hashPassword,
		});

		const newUser = await createUser.save();

		res.status(200).send("User is created");
	} catch (err) {
		next(err);
	}
}

async function loginUser(req, res, next) {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });

		if (!user) {
			res.status(400).send(`Тaкой ${email} несуществует`);
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			res.status(400).send(`Неверный пароль`);
		}

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRES,
		});

		//Добавляю к пользователю токен
		const us = await User.findOneAndUpdate(
			{ _id: user._id },
			{ $set: { token: token } },
			{ new: true }
		);

		//'Bearer' authtorization
		res.json({ token });

		//Cookie token
		//res.cookie("token", token, { httpOnly: true });
		//res.status(200).send(token);
	} catch (err) {
		next(err);
	}
}

async function logOut(req, res) {
	const { email } = req.body;
	await User.findOneAndUpdate({ email }, { token: "" });
	res.status(200).send("Вы разлогинены");
}

module.exports = {
	getAllUsers,
	addUser,
	findUser,
	loginUser,
	logOut,
};
