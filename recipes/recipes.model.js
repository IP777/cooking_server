const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recipesSchema = new Schema({
	recipe_name: { type: String, required: true },
	category: String,
	autor: String,
	description: String,
	ingredients: [{ id: String, ingridient: String, count: String }],
	recipe: [Object],
	main_image_src: String,
});

const recipeModel = mongoose.model("recipes", recipesSchema);

module.exports = recipeModel;
