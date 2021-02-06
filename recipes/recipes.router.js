const { Router } = require("express");
const ricepesRouter = Router();

const controller = require("./recipes.controller");
const agrigate = require("./recipe.agrigate");
const { authorize } = require("../auth/auth.middleware");

ricepesRouter.get("/all", controller.getAllRecepes);
ricepesRouter.get("/recipe/:recipeId", controller.getRecipesByID);
ricepesRouter.post("/ingredient", controller.getForIngredientRecepes);
ricepesRouter.post("/name", controller.getForNameRecepes);
ricepesRouter.post("/create", authorize, controller.create);
ricepesRouter.delete("/:recipeId", authorize, controller.deleteRecipeByID);
ricepesRouter.patch("/:recipeId", authorize, controller.updateRecipe);

ricepesRouter.get("/user/:userName", agrigate.userRecipe);

module.exports = ricepesRouter;
