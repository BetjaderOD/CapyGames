const { generateToken } = require("../../../config/jwt");
const { validatePassword } = require("../../../utils/functions");
const { query } = require("../../../utils/mysql");

const login = async (customer) => {
  if (!customer.customer_email || !customer.customer_password)
    throw Error("Missing fields");
  const sql = `SELECT * FROM customers WHERE customer_email = ?;`;
  const existsUser = await query(sql, [customer.customer_email]);
  if (
    await validatePassword(
      customer.customer_password,
      existsUser[0].customer_password
    )
  ) {
    return {
      token: generateToken({
        email: customer.customer_email,
        id: existsUser[0].customer_id,
        customer: existsUser[0].customer_id,
      }),
    };
  }
  throw Error("Password mismatch");
};

module.exports = { login };
