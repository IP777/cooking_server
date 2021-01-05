const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const recipesSchema = new Schema({
	recipe_name: { type: String, required: true, unique: true },
	category: String,
	description: String,
	ingredients: Array,
	recipe: [Object],
});

const recipeModel = mongoose.model("recipes", recipesSchema);

module.exports = recipeModel;
