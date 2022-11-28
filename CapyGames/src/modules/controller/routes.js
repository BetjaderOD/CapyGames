const { gamesRouter } = require("./game/game.controller");
const { cartRouter } = require("./cart/cart.controller");
const { coustumersRouter } = require("./customer/customer.controller");
const { authRouter } = require("./auth/auth.controller");

module.exports = {
  gamesRouter,
  cartRouter,
  coustumersRouter,
  authRouter,
};