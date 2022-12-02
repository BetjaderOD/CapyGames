const express = require("express");
require("dotenv").config();

const cors = require("cors");

const {
  gamesRouter,
  cartRouter,
  customersRouter,
  authRouter,
  orderRouter,
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
app.use("/customers", customersRouter);
app.use("/auth", authRouter);
app.use("/order", orderRouter);

module.exports = {
  app,
};
