const express = require("express");
require("dotenv").config();

const cors = require("cors");

const {
    gamesRouter, cartRouter,
} = require("../modules/controller/routes");

const app = express();
app.set("port", process.env.PORT || 3000);

app.use(cors({ origins: "*" }));
app.use(express.json({ limit: "50mb" }));

app.get("/", (req, res) => {
    res.send("Bienvenido a CapyGames");
});

app.use("/games", gamesRouter);
app.use("/cart", cartRouter);


module.exports = {
    app,
};