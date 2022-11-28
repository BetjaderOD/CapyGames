const { Response, Router } = require('express');
const { validateError } = require ("../../../utils/functions");
const { findAll, findById, save} = require("./cart.gateway");


const getAll = async (res = Response) => {
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
const insert = async (req, res = Response) => {
    try{
        const {game_id,costumers_id,cart_quantity} = req.body;
        const cart = await save({
            game_id,
            costumers_id,
            cart_quantity

        });
        res.status(200).json(cart);
    }catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).json({ message });
    }
}

const cartRouter = Router();
cartRouter.get("/", [], getAll);
cartRouter.get("/:id", [], getById);
cartRouter.post("/", [], insert);

module.exports = {
    cartRouter,
}