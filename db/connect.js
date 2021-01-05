const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("useFindAndModify", false);

const connect = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		console.log("База данных подключена...");
	} catch (err) {
		if (err) {
			console.log(err);
			process.exit(1);
		}
	}
};

module.exports = connect;
