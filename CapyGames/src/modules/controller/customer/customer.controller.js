const { Response, Router } = require("express");
const { validateError } = require("../../../utils/functions");
const {
    findAll,
    findById,
    save,
    update,
    remove,
} = require("./customer.gateway");

const getAll = async (req, res = Response) => {
  try {
    const customer = await findAll();
    res.status(200).json(customer);
  } catch (err) {
    console.log(err);
    const message = validateError(err);
    res.status(400).json({ message });
  }
};

const getById = async (req, res = Response) => {
  try {
    const { customer_id } = req.params;
    const results = await findById(customer_id);
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    const message = validateError(err);
    res.status(400).json({ message });
  }
};

const insert = async (req, res = Response) => {
  try {
    const { name, password, email, address, phone } = req.body;
    console.log(req.body);
    const custumer = await save({
      name,
      password,
      email,
      address,
      phone,
    });
    res.status(200).json(custumer);
  } catch (error) {
    console.log(error);
    const message = validateError(error);
    res.status(400).send({ message });
  }
};

const updateCustomer = async (req, res = Response) => {
  try {
    const { id, name, password, email, address, phone } = req.body;
    const custumer = await update({
      id,
      name,
      password,
      email,
      address,
      phone,
    });
    res.status(200).json(custumer);
  } catch (error) {
    console.log(error);
    const message = validateError(error);
    res.status(400).send({ message });
  }
};

const deleteCustomer = async (req, res = Response) => {
  try {
    const { customer_id } = req.params;
    const customer = await remove(customer_id);
    res.status(200).json(customer);
  } catch (err) {
    console.log(err);
    const message = validateError(err);
    res.status(400).json({ message });
  }
};

const coustumersRouter = Router();

coustumersRouter.get("/", [], getAll);
coustumersRouter.get("/:id", [], getById);
coustumersRouter.post("/", [], insert);
coustumersRouter.put("/", [], updateCustomer);
coustumersRouter.delete("/:id", [], deleteCustomer);

module.exports = {
  coustumersRouter,
};
