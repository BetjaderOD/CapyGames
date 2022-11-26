const { gamesRouter } = require("./game/game.controller");
const { cartRouter } = require("./cart/cart.controller");
const { customersRouter } = require("./customer/customer.controller");
const { authRouter } = require("./auth/auth.controller");

module.exports = {
  gamesRouter,
  cartRouter,
  customersRouter,
  authRouter,
};