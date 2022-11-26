const { query } = require ("../../../utils/mysql");

const findAll = async () => {
    const sql = "SELECT * FROM games";
    return await query(sql, []);
};

const findById = async (id) => {
    if (Number.isNaN(id)) throw Error('Wrong type');
    if (!id) throw Error('Missing fields');
    const sql = `SELECT * FROM games WHERE id = ?`;
    return await query(sql, [id]);
};

const save = async (game) => {
    if (
      !game.name ||
      !game.genre ||
      !game.price ||
      !game.image ||
      !game.description ||
      !game.stock
    )
      throw Error('Missing fields');
    const sql = `INSERT INTO games (name, genre, price, image, description, stock) VALUES (?, ?, ?, ?, ?, ?)`;
    const { insertedId } = await query(sql, [
        game.name,
        game.genre,
        game.price,
        game.image,
        game.description,
        game.stock
    ]);
    return { id: insertedId, ...game };
};

const update = async (game) => {
    if (
        !game.name ||
        !game.genre ||
        !game.price ||
        !game.image ||
        !game.description ||
        !game.stock
        )
        throw Error('Missing fields');
    const sql = `UPDATE games SET name = ?, genre = ?, price = ?, image = ?, description = ?, stock = ? WHERE id = ?`;
    const { insertedId } = await query(sql, [
        game.name,
        game.genre,
        game.price,
        game.image,
        game.description,
        game.stock,
        game.id
    ]);
    return { id: insertedId, ...game };
};

const remove = async (id) => {
    const sql = `DELETE FROM games WHERE id = ?`;
    return await query(sql, [id]);
};


module.exports = {
    findAll,
    findById,
    save,
    update,
    remove
};