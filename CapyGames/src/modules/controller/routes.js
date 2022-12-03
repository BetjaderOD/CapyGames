const { gamesRouter } = require("./game/game.controller");
const { cartRouter } = require("./cart/cart.controller");
const { customersRouter } = require("./customer/customer.controller");
const { authRouter } = require("./auth/auth.controller");
const { orderRouter } = require("./order/order.controller");
const { reviewsRouter } = require("./review/review.controller");

module.exports = {
    gamesRouter,
    cartRouter,
    orderRouter,
    customersRouter,
    authRouter,
    reviewsRouter,
};