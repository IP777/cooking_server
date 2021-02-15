const { Router } = require("express");
const categoryRouter = Router();
const { isAdmin } = require("../middleware/midellware");

const controller = require("./category.controller");

categoryRouter.get("/all", controller.getAllCategory);
categoryRouter.post("/add/:password", isAdmin, controller.addCategory);
categoryRouter.delete(
	"/delete/:password",
	isAdmin,
	controller.deleteCategoryByID
);

module.exports = categoryRouter;
