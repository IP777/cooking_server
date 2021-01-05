const { Router } = require("express");
const authRouter = Router();

const controller = require("./auth.controller");
const { authorize } = require("./auth.middleware");

authRouter.get("/all/", controller.getAllUsers);
authRouter.get("/find/:id", authorize, controller.findUser);
authRouter.post("/add/", controller.addUser);
authRouter.post("/login/", controller.loginUser);
authRouter.post("/logout/", controller.logOut);

module.exports = authRouter;
