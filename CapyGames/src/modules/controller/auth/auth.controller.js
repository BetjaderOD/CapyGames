const { Respose, Router } = require('express');
const { validateError } = require('../../../utils/functions');
const { login } = require('./auth.gateway');

const signin = async (req, res = Respose) => {
  try {
    const { customer_email, customer_password } = req.body;
    const token = await login({ customer_email, customer_password });
    res.status(200).json(token);
  } catch (error) {
    console.log(error);
    const message = validateError(error);
    res.status(400).json({ message });
  }
};

const authRouter = Router();

authRouter.post(`/`, signin);

module.exports = {
  authRouter,
};