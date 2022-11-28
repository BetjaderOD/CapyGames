const { gamesRouter } = require("./game/game.controller");
const { cartRouter } = require("./cart/cart.controller");
const { orderRouter } = require("./orders/order.controller");

module.exports = {
    gamesRouter,
    cartRouter,
    orderRouter
};