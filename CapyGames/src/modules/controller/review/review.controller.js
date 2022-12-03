const { Response, Router } = require("express");
const { validateError } = require("../../../utils/functions");
const { findAll, findById, save, update, remove } = require("./review.gateway");

const getAll = async (req, res = Response) => {
  try {
    const reviews = await findAll();
    res.status(200).json(reviews);
  } catch (error) {
    console.log(error);
    const message = validateError(error);
    res.status(400).json({ message });
  }
};

const getById = async (req, res = Response) => {
  try {
    const { id } = req.params;
    const review = await findById(id);
    res.status(200).json(review);
  } catch (error) {
    console.log(error);
    const message = validateError(error);
    res.status(400).json({ message });
  }
};

const insert = async (req, res = Response) => {
  try {
    const {
      customer_id,
      game_id,
      review_date,
      review_title,
      review_description,
      review_rating,
    } = req.body;
    const review = await save({
      customer_id,
      game_id,
      review_date,
      review_title,
      review_description,
      review_rating,
    });
    res.status(200).json(review);
  } catch (error) {
    console.log(error);
    const message = validateError(error);
    res.status(400).json({ message });
  }
};

const updateReview = async (req, res = Response) => {
  try {
    const {
      review_id,
      customer_id,
      game_id,
      review_date,
      review_title,
      review_description,
      review_rating,
    } = req.body;
    const review = await update({
      review_id,
      customer_id,
      game_id,
      review_date,
      review_title,
      review_description,
      review_rating,
    });
    res.status(200).json(review);
  } catch (error) {
    console.log(error);
    const message = validateError(error);
    res.status(400).json({ message });
  }
};

const deleteReview = async (req, res = Response) => {
  try {
    const { id } = req.params;
    const review = await remove(id);
    res.status(200).json(review);
  } catch (error) {
    console.log(error);
    const message = validateError(error);
    res.status(400).json({ message });
  }
};

const reviewsRouter = Router();

reviewsRouter.get("/", getAll);
reviewsRouter.get("/:id", getById);
reviewsRouter.post("/", insert);
reviewsRouter.put("/", updateReview);
reviewsRouter.delete("/:id", deleteReview);

module.exports = {
  reviewsRouter,
};
