const { Response, Router } = require('express');
const { validateError } = require ("../../../utils/functions");
const { findAll, findById, save, update, remove } = require("./game.gateway");

const getAll = async (req, res = Response) => {
    try {
        const games = await findAll();
        res.status(200).json(games);

    }catch(error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const getById = async (req, res = Response) => {
    try {
        const { id } = req.params;
        const game = await findById(id);
        res.status(200).json(game);

    }catch(error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const insert = async (req, res = Response) => {
    try {
      const { name, genre, price, image, description, stock } = req.body;
      const game = await save({
        name,
        genre,
        price,
        image,
        description,
        stock
      });
      res.status(200).json(game);
    } catch (error) {
      console.log(error);
      const message = validateError(error);
      res.status(400).json({ message });
    }
};

const updateGame = async (req, res = Response) => {
    try {
        const { name, genre, price, image, description, stock } = req.body;
        const game = await update({
            name,
            genre,
            price,
            image,
            description,
            stock
        });
        res.status(200).json(game);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const deleteGame = async (req, res = Response) => {
    try {
        const { id } = req.params;
        const game = await remove(id);
        res.status(200).json(game);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const gamesRouter = Router();

gamesRouter.get("/", [], getAll);
gamesRouter.get("/:id", [], getById);
gamesRouter.post("/", [], insert);
gamesRouter.put("/", [], updateGame); 
gamesRouter.delete("/:id", [], deleteGame);

module.exports = {
    gamesRouter,
};