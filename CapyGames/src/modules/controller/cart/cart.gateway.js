const { query } = require("../../../utils/mysql");

const findAll = async () => {
  const sql =
    "select games.game_name, customers.customer_name, cart.cart_id , cart.cart_quantity from cart, games, customers where cart.game_id = games.game_id and cart.customer_id = customers.customer_id;";
  return await query(sql, []);
};

const findById = async (id) => {
  if (Number.isNaN(id)) throw Error("Wrong type");
  if (!id) throw Error("Missing fields");
  const sql =
    "select games.game_name, customers.customer_name, cart.cart_id , cart.cart_quantity from cart, games, customers where cart.game_id = games.game_id and cart.customer_id = customers.customer_id and cart.cart_id = ?;";
  return await query(sql, [id]);
};

const save = async (cart) => {
  if (!cart.game_id || !cart.costumers_id || !cart.cart_quantity)
    throw Error("Missing fields");
  const sql =
    "INSERT INTO cart (game_id, customer_id, cart_quantity) VALUES (?, ?,?);";
  const { insertedId } = await query(sql, [
    cart.game_id,
    cart.costumers_id,
    cart.cart_quantity,
  ]);
  return { ...cart, id: insertedId };
};

const update = async (cart) => {
  if (!cart.game_id || !cart.costumers_id || !cart.cart_quantity)
    throw Error("Missing fields");
  const sql =
    "UPDATE cart SET game_id = ?, customer_id = ?, cart_quantity = ? WHERE cart_id = ?;";
  const { insertedId } = await query(sql, [
    cart.game_id,
    cart.costumers_id,
    cart.cart_quantity,
    cart.cart_id,
  ]);
  return { ...cart, id: insertedId };
};

const remove = async (id) => {
  if (Number.isNaN(id)) throw Error("Wrong type");
  if (!id) throw Error("Missing fields");
  const sql = "DELETE FROM cart WHERE cart_id = ?;";
  return await query(sql, [id]);
};

module.exports = {
  findAll,
  findById,
  save,
  update,
  remove,
};
