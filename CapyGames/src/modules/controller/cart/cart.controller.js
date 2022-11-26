const { Response, Router } = require('express');
const { validateError } = require ("../../../utils/functions");
const { findAll} = require("./cart.gateway");
const {findById} = require("../game/game.gateway");

const getAll = async (req, res = Response) => {
    try {
        const cart = await findAll();
        res.status(200).json(cart);

    }catch(error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
}
const getById = async (req, res = Response) => {
    try {
        const { id } = req.params;
        const cart = await findById(id);
        res.status(200).json(cart);

    }catch(error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
};

const cartRouter = Router();
cartRouter.get("/", [], getAll);
cartRouter.get("/:id", [], getById);

module.exports = {
    cartRouter,
}