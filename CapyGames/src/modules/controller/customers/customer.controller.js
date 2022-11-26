const { Response, Router } = require('express');
const { validateError } = require ("../../../utils/functions");
const { Response, Router } = require('express');
const { validateError } = require('../../../utils/functions');
const { save, findAll, deleteId, updateById,findById} = require('./customer.gateway');
const {auth, checkRoles} = require("../../../config/jwt");

const getAll = async (req,res = Response) =>{
    try {
        const results= await findAll();
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({ message });
    }
}
const getById = async (req,res = Response) =>{
    try {
        const {customer_id} = req.params;
        const results= await findById(customer_id);
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({ message });
    }
}
const insert = async (req, res = Response) => {
    try {
        const { customer_name,customer_password,customer_email,customer_address,customer_phone} = req.body;
        console.log(req.body);
        const costumer = await save({ customer_name,customer_password,customer_email,customer_address,customer_phone});
        res.status(200).json(costumer);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).send({ message });
    }
};
const update = async (req, res = Response) => {
    try {
        const { customer_name,customer_password,customer_email,customer_address,customer_phone,customer_id} = req.body;
        console.log(req.body);
        const costumer = await updateById({customer_name,customer_password,customer_email,customer_address,customer_phone,customer_id });
        res.status(200).json(costumer);
    } catch (error) {
        console.log(error);
        const message = validateError(error);
        res.status(400).send({ message });
    }
};

const deleteById = async (req,res = Response) =>{
    try {
        const {customer_id} = req.params;
        const results= await deleteId(customer_id);
        res.status(200).json(results);
    } catch (err) {
        console.log(err);
        const message = validateError(err);
        res.status(400).json({ message });
    }
};

const coustumersRouter = Router();
coustumersRouter.post('/', [], insert);
coustumersRouter.get('/', [auth, checkRoles(['costumer'])], getAll); 
coustumersRouter.get('/:customer_id', [], getById);
coustumersRouter.delete('/:customer_id', [], deleteById);
coustumersRouter.put('/', [], update);



module.exports = {
    coustumersRouter,
};
