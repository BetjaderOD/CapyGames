const { query } = require ("../../../utils/mysql");

const findAll = async () => {
    const sql = "SELECT * FROM games";
    return await query(sql, []);
};

const findById = async (id) => {
    if (Number.isNaN(id)) throw Error('Wrong type');
    if (!id) throw Error('Missing fields');
    const sql = `SELECT * FROM games WHERE game_id = ?`;
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
    const sql = `INSERT INTO games (game_name, game_genre, game_price, game_image, game_description, game_stock) VALUES (?, ?, ?, ?, ?, ?)`;
    const { insertedId } = await query(sql, [
        game.name,
        game.genre,
        game.price,
        game.image,
        game.description,
        game.stock
    ]);
    return { ...game, id: insertedId };
};

const update = async (game) => {
    if (
        !game.id ||
        !game.name ||
        !game.genre ||
        !game.price ||
        !game.image ||
        !game.description ||
        !game.stock
        )
        throw Error('Missing fields');
    const sql = `UPDATE games SET game_name = ?, game_genre = ?, game_price = ?, game_image = ?, game_description = ?, game_stock = ? WHERE game_id = ?`;
    const { insertedId } = await query(sql, [
        game.name,
        game.genre,
        game.price,
        game.image,
        game.description,
        game.stock,
        game.id
    ]);
    return { ...game, id: insertedId };
};

const remove = async (id) => {
    const sql = `DELETE FROM games WHERE game_id = ?`;
    return await query(sql, [id]);
};


module.exports = {
    findAll,
    findById,
    save,
    update,
    remove
};