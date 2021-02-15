const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
	category_name: { type: String, unique: true, required: true },
});

const categoryModel = mongoose.model("category", categorySchema);

module.exports = categoryModel;
