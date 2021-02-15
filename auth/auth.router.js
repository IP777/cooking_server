const { Router } = require("express");
const authRouter = Router();

const controller = require("./auth.controller");
const { authorize } = require("./auth.middleware");
const { isAdmin } = require("../middleware/midellware");

authRouter.get("/all/:password", isAdmin, controller.getAllUsers);
authRouter.get("/find/:id", authorize, controller.findUser);
authRouter.post("/add/", controller.addUser);
authRouter.post("/login/", controller.loginUser);
authRouter.post("/logout/", controller.logOut);

authRouter.get("/test", authorize, (req, res) => {
	res.status(200).send({ message: "Вы зарегестрированы." });
});

module.exports = authRouter;
