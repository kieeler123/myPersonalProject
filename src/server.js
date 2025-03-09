require("dotenv").config();
const express = require("express");
const path = require("path");
const router = require("./router/router");

const app = express();

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public"))); // ✅ 올바름!

app.use("/", router);
app.use("/watch", router);
app.use("/storage", router);
app.use("/search", router);

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 서버 실행: http://localhost:${PORT}`));

module.exports = app;