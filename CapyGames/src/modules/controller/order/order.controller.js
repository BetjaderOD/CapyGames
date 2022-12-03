const { Response, Router } = require("express");
const { validateError } = require("../../../utils/functions");

const { findAll, findById, save, update, remove } = require("./order.gateway");

const getAll = async (res = Response) => {
  try {
    const orders = await findAll();
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    const message = validateError(error);
    res.status(400).json({ message });
  }
};

const getById = async (req, res = Response) => {
  try {
    const { id } = req.params;
    const order = await findById(id);
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    const message = validateError(error);
    res.status(400).json({ message });
  }
};

const insert = async (req, res = Response) => {
  try {
    const { customer_id, game_id, cart_id, order_date, order_status } =
      req.body;
    const order = await save({
      customer_id,
      game_id,
      cart_id,
      order_date,
      order_status,
    });
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    const message = validateError(error);
    res.status(400).json({ message });
  }
};

const updateOrder = async (req, res = Response) => {
  try {
    const { id, customer_id, game_id, cart_id, order_date, order_status } =
      req.body;
    const order = await update({
      id,
      customer_id,
      game_id,
      cart_id,
      order_date,
      order_status,
    });
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    const message = validateError(error);
    res.status(400).json({ message });
  }
};

const deleteOrder = async (req, res = Response) => {
  try {
    const { id } = req.params;
    const order = await remove(id);
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    const message = validateError(error);
    res.status(400).json({ message });
  }
};

const orderRouter = Router();

orderRouter.get("/", [], getAll);
orderRouter.get("/:id", [], getById);
orderRouter.post("/", [], insert);
orderRouter.put("/", [], updateOrder);
orderRouter.delete("/:id", [], deleteOrder);

module.exports = {
  orderRouter,
};