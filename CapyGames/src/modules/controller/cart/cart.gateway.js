const { query } = require ("../../../utils/mysql");
const findAll = async () => {
    const sql = "select games.game_name, customers.customer_name, cart.cart_id from cart, games, customers where cart.game_id = games.game_id and cart.customer_id = customers.customer_id;";
    return await query(sql, []);
};
const findById = async (id) => {
    if (Number.isNaN(id)) throw Error('Wrong type');
    if (!id) throw Error('Missing fields');
    const sql = "select games.game_name, customers.customer_name, cart.cart_id from cart, games, customers where cart.game_id = games.game_id and cart.customer_id = customers.customer_id and cart.cart_id = ?;";
    return await query(sql, [id]);
}
module.exports = {
    findAll,
    findById,

}