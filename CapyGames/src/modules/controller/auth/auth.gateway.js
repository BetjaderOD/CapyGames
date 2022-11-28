const { generateToken } = require("../../../config/jwt");
const { validatePassword } = require("../../../utils/functions");
const { query } = require("../../../utils/mysql");

const login = async (customer) => {
  if (!customer.email || !customer.password) throw Error("Missing fields");
  const sql = `SELECT * FROM customers WHERE customer_email = ?;`;
  const existsUser = await query(sql, [user.email]);
  if (await validatePassword(customer.password, existsUser[0].password)) {
    return {
      token: generateToken({
        email: customer.email,
        role: existsUser[0].role,
        id: existsUser[0].id,
        customer: existsUser[0].customer_id,
      }),
    };
  }
  throw Error("Password mismatch");
};

module.exports = { login };
