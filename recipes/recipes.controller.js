const Recipe = require("./recipes.model");
const User = require("../auth/auth.model");
const jwt = require("jsonwebtoken");

async function getAllRecepes(req, res, next) {
	try {
		const recipeList = await Recipe.find();
		res.status(200).send(recipeList);
	} catch (err) {
		next(err);
	}
}

async function getRecipesByID(req, res, next) {
	const { recipeId } = req.params;
	try {
		const getContact = await Recipe.findById(recipeId);

		if (!getContact) {
			const err = new Error(`User with id ${recipeId} does not exist`);
			err.status = 404;
			throw err;
		}

		res.status(200).send(getContact);
	} catch (err) {
		next(err);
	}
}

async function create(req, res, next) {
	try {
		const {
			recipe_name,
			category,
			description,
			ingredients,
			recipe,
		} = req.body;
		const { _id, recept } = req.user;

		const createRecipe = new Recipe({
			recipe_name,
			category,
			description,
			ingredients,
			recipe,
		});

		await createRecipe.save();

		await User.findOneAndUpdate(
			{ _id },
			{ $set: { recept: [...recept, createRecipe._id] } },
			{ new: true }
		);

		res.status(200).send("Рецепт добавлен");
	} catch (err) {
		next(err);
	}
}

async function deleteRecipeByID(req, res, next) {
	try {
		const { recipeId } = req.params;
		const { _id, recept } = req.user;

		const deleteRecept = await Recipe.findOneAndDelete({
			_id: recipeId,
		});

		if (!deleteRecept) {
			const err = new Error(`User with id ${recipeId} does not exist`);
			err.status = 404;
			throw err;
		}

		await User.findOneAndUpdate(
			{ _id },
			{ $set: { recept: recept.filter((id) => id != recipeId) } },
			{ new: true }
		);

		res.send("Рецепт удален");
	} catch (err) {
		next(err);
	}
}

async function updateRecipe(req, res, next) {
	try {
		const { recipeId } = req.params;

		const recipeUpdate = await Recipe.findOneAndUpdate(
			{ _id: recipeId },
			{ $set: { ...req.body } },
			{ new: true }
		);

		if (recipeUpdate === null) {
			const err = new Error(`Recept id ${recipeId} is not found!`);
			err.status = 404;
			throw err;
		}

		res.status(200).send(recipeUpdate);
	} catch (err) {
		err.status = 404;
		next(err);
	}
}

async function getForIngredientRecepes(req, res, next) {
	try {
		const { ingredient } = req.body;

		const recipeList = await Recipe.find({ ingredients: ingredient });
		res.status(200).send(recipeList);
	} catch (err) {
		next(err);
	}
}

module.exports = {
	create,
	getAllRecepes,
	getRecipesByID,
	deleteRecipeByID,
	updateRecipe,
	getForIngredientRecepes,
};
