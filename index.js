const express = require("express");
var cors = require("cors");
const app = express();
require("dotenv").config();
const connect = require("./db/connect");

const authRouter = require("./auth/auth.router");
const ricepesRouter = require("./recipes/recipes.router");
const categoryRouter = require("./category/category.router");

const PORT = process.env.PORT || 80;

//Прослойка для обработки запросов от json
app.use(express.json());
//Прослойка для обработки запросов от формы
app.use(express.urlencoded({ extended: true }));
// CORS заголовки с разрешением доступа с любого сервера
app.use(cors());

app.get("/", function (req, res) {
	res.sendFile(__dirname + "/initialPage/initialPage.html");
});

app.use("/user", authRouter);
app.use("/ricepes", ricepesRouter);
app.use("/category", categoryRouter);

app.use((err, req, res, next) => {
	const { message, status } = err;

	res.status(status || 500).send(message);
});

connect();

app.listen(PORT, () => {
	console.log(`Server has been started ${PORT}...`);
});

//Тестирование сервера на heroku
//heroku logs --tail
//Деплой на сервер heroku
//git push heroku master

//Инициализация package.json
//npm init -y
