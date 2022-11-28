const { gamesRouter } = require("./game/game.controller");
const { cartRouter } = require("./cart/cart.controller");
<<<<<<< HEAD
const { orderRouter } = require("./orders/order.controller");

module.exports = {
    gamesRouter,
    cartRouter,
    orderRouter
=======
const { coustumersRouter } = require("./customer/customer.controller");
const { authRouter } = require("./auth/auth.controller");

module.exports = {
  gamesRouter,
  cartRouter,
  coustumersRouter,
  authRouter,
>>>>>>> 6d188426d92b7835391b44c9048fe7641fed6ea0
};