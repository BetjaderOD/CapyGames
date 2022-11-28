const { gamesRouter } = require("./game/game.controller");
const { cartRouter } = require("./cart/cart.controller");
const { customersRouter } = require("./customer/customer.controller");
const { authRouter } = require("./auth/auth.controller");
const { orderRouter } = require("./orders/order.controller");

module.exports = {
    gamesRouter,
    cartRouter,
    orderRouter,
    customersRouter,
    authRouter,
};


module.exports = {
  gamesRouter,
  cartRouter,
  customersRouter,
  authRouter,
  orderRouter
};