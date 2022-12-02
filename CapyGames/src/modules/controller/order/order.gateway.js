const { query } = require("../../../utils/mysql");

const findAll = async () => {
    const sql = "SELECT * FROM orders ";
    return await query(sql, []);
};

const findById = async (id) => {
    if (Number.isNaN(id)) throw Error('Wrong type');
    if (!id) throw Error('Missing fields');
    const sql = `SELECT * FROM orders WHERE order_id = ?`;
    return await query(sql, [id]);
};


const save = async (order) => {
    if (
        !order.customer_id ||
        !order.game_id ||
        !order.cart_id ||
        !order.order_date ||
        !order.order_status
    )
        throw Error('Missing fields');
    const sql = `INSERT INTO orders (customer_id, game_id, cart_id, order_date, order_status) VALUES (?, ?, ?, ?, ?)`;
    const { insertedId } = await query(sql, [
        order.customer_id,
        order.game_id,
        order.cart_id,
        order.order_date,
        order.order_status,
    ]);
    return { ...order, id: insertedId };
};


const update = async (order) => {
    if (
        !order.customer_id ||
        !order.game_id ||
        !order.cart_id ||
        !order.order_date ||
        !order.order_status
    )
        throw Error('Missing fields');
    const sql = `UPDATE orders SET customer_id = ?, game_id = ?, cart_id = ?, order_date = ?, order_status = ?,  WHERE order_id = ?`;
    const { insertedId } = await query(sql, [
        order.customer_id,
        order.game_id,
        order.cart_id,
        order.order_date,
        order.order_status,
    ]);
    return { ...order, id: insertedId };
};

const remove = async (id) => {
    const sql = `DELETE FROM orders WHERE order_id = ?`;
    return await query(sql, [id]);
};

module.exports = {
    findAll,
    findById,
    save,
    update,
    remove
};