const { Router } = require("express");
const ricepesRouter = Router();

const controller = require("./recipes.controller");
const agrigate = require("./recipe.agrigate");
const { authorize } = require("../auth/auth.middleware");

ricepesRouter.get("/all", controller.getAllRecepes);
ricepesRouter.get("/recipe/:recipeId", controller.getRecipesByID);
ricepesRouter.post("/search/name", controller.searchForNameRecepes);
ricepesRouter.post("/search/category", controller.searchForCaregoryRecepes);
ricepesRouter.post("/search/ingridient", controller.searchForIngredientRecepes);
ricepesRouter.post("/create", authorize, controller.create);
ricepesRouter.delete("/:recipeId", authorize, controller.deleteRecipeByID);
ricepesRouter.post("/:recipeId", authorize, controller.updateRecipe);

ricepesRouter.get("/user/:userName", agrigate.userRecipe);

module.exports = ricepesRouter;
