const Category = require("./category.model");

async function getAllCategory(req, res, next) {
	try {
		const categoryList = await Category.find();
		res.status(200).send(categoryList);
	} catch (err) {
		next(err);
	}
}

async function addCategory(req, res, next) {
	const { name } = req.body;
	try {
		const newCategory = await new Category({
			category_name: name,
		}).save();

		res.status(200).json({
			message: `Категория ${newCategory.category_name} создана.`,
		});
	} catch (err) {
		next(err);
	}
}

async function deleteCategoryByID(req, res, next) {
	try {
		const { categoryId } = req.body;

		const deleteRecept = await Category.findOneAndDelete({
			_id: categoryId,
		});

		res.send({ message: `Рецепт ${deleteRecept.category_name} удален` });
	} catch (err) {
		next(err);
	}
}

module.exports = {
	getAllCategory,
	addCategory,
	deleteCategoryByID,
};
