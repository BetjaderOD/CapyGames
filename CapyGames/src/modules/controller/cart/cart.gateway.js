const { query } = require("../../../utils/mysql");

const findAll = async () => {
  const sql =
    "select games.game_name, games.game_price, cart.cart_id, cart.cart_quantity, (games.game_price * cart.cart_quantity) as total_price from cart, games where cart.game_id = games.game_id;";
  return await query(sql, []);
};

const findById = async (id) => {
  if (Number.isNaN(id)) throw Error("Wrong type");
  if (!id) throw Error("Missing fields");
  const sql =
"select games.game_id, games.game_name, games.game_price, cart.cart_quantity, games.game_price * cart.cart_quantity as total_price, cart.cart_id from cart, games where cart.game_id = games.game_id and cart.customer_id = ?;";
  return await query(sql, [id]);
};

const save = async (cart) => {
  console.log(cart);
  if (!cart.game_id || !cart.customer_id || !cart.cart_quantity)
    throw Error("Missing fields");
  const sql =
    "CALL add_game_to_cart(?,?);";
  const { insertedId } = await query(sql, [
    cart.customer_id,
    cart.game_id
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
  const sql = "DELETE from cart WHERE cart_id = ?;";
  return await query(sql, [id]);
};

module.exports = {
  findAll,
  findById,
  save,
  update,
  remove,
};
