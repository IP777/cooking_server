const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
	first_name: String,
	email: {
		type: String,
		required: true,
		alias: "login",
		validate: (value) => value.includes("@"),
		unique: true,
	},
	name: {
		type: String,
		default: "Ivanov",
		get: (v) => v.toUpperCase(),
	},
	password: {
		type: String,
		required: true,
	},
	token: {
		type: String,
	},
	recept: Array,
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
