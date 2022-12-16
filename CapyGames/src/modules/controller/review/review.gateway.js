const { query } = require("../../../utils/mysql");

const findAll = async () => {
  const sql = "SELECT * FROM reviews";
  return await query(sql, []);
};

const findById = async (id) => {
  if (Number.isNaN(id)) throw Error("Wrong type");
  if (!id) throw Error("Missing fields");
  const sql = `SELECT * FROM reviews WHERE game_id = ?`;
  return await query(sql, [id]);
};

// const save = async (review) => {
//   if (
//     !review.review_date ||
//     !review.review_title ||
//     !review.review_description ||
//     !review.review_rating
//   )
//     throw Error("Missing fields");
//   const sql = `INSERT INTO reviews (review_date, review_title, review_description, review_rating) VALUES (?, ?, ?, ?)`;
//   const { insertedId } = await query(sql, [
//     review.review_date,
//     review.review_title,
//     review.review_description,
//     review.review_rating,
//   ]);
//   return { ...review, id: insertedId };
// };

//save
const save = async (review) => {
  if (
    !review.game_id||
  !review.review_date||
  !review.review_title||
  !review.review_description ||
  !review.review_rating
)
  throw Error("Missing fields");
  const sql = "INSERT INTO reviews (game_id, review_date, review_title, review_description, review_rating) VALUES (?, ?, ?, ?, ?)";
  const { insertedId } = await query(sql, [
    review.game_id,
    review.review_date,
    review.review_title,
    review.review_description,
    review.review_rating,
  ]);
  return { ...review, id: insertedId };
};

const update = async (review) => {
  if (
    !review.review_id ||
    !review.game_id ||
    !review.review_date ||
    !review.review_title ||
    !review.review_description ||
    !review.review_rating
  )
    throw Error("Missing fields");
  const sql = `UPDATE reviews SET game_id = ?, review_date = ?, review_title = ?, review_description = ?, review_rating = ? WHERE review_id = ?`;
  const { insertedId } = await query(sql, [
    review.game_id,
    review.review_date,
    review.review_title,
    review.review_description,
    review.review_rating,
    review.review_id,
  ]);
  return { ...review, id: insertedId };
};

const remove = async (id) => {
  const sql = `DELETE FROM reviews WHERE review_id = ?`;
  return await query(sql, [id]);
};

module.exports = {
  findAll,
  findById,
  save,
  update,
  remove,
};
