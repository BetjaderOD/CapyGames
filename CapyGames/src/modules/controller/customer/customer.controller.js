const { Response, Router } = require("express");
const { transporter, template } = require("../../../utils/email-service");
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
    console.log(req.params);
    const results = await findById(customer_id);
    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    const message = validateError(err);
    res.status(400).json({ message });
  }
};

const saveAndFlush = async (req, res = Response) => {
  try {
    const { name, password, email, address, phone } = req.body;
    const customer = await save({
      name,
      password,
      email,
      address,
      phone,
    });
    const info = await transporter.sendMail({
      from: `CapyGames <${ process.env.EMAIL_USER }>`,
      to: email,
      subject: `Welcome to CapyGames!, ${ name }`,
      html: template("Hello and welcome to Capy Games Family, my name is Capybara, but you can call me Capy c:", email, "https://capygames.com"),
    });
    console.log(info);
    res.status(200).json(customer);
  } catch (error) {
    console.log(error);
    const message = validateError(error);
    res.status(400).send({ message });
  }
};

const updateCustomer = async (req, res = Response) => {
  try {
    const { customer_name, customer_password, customer_email, customer_address, customer_phone, customer_id  } = req.body;
    const customer = await update({

      customer_name ,
      customer_password ,
      customer_email ,
      customer_address ,
      customer_phone ,
      customer_id
    });
    console.log(req.body);
    res.status(200).json(customer);
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

const customersRouter = Router();

customersRouter.get("/", [], getAll);
customersRouter.get("/:id", [], getById);
customersRouter.post("/", [], saveAndFlush);
customersRouter.put("/", [], updateCustomer);
customersRouter.delete("/:id", [], deleteCustomer);

module.exports = {
  customersRouter,
};
