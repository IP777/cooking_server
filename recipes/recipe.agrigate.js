const User = require("../auth/auth.model");

async function userRecipe(req, res, next) {
	try {
		const { userName } = req.params;

		const userRecipes = await User.aggregate([
			{
				$lookup: {
					from: "recipes",
					localField: "recept",
					foreignField: "_id",
					as: "userRecipes",
				},
			},
			{ $match: { name: userName } },
			{
				$project: { userRecipes: "$userRecipes" },
			},
		]);

		res.status(200).send(userRecipes);
	} catch (err) {
		next(err);
	}
}

module.exports = {
	userRecipe,
};
