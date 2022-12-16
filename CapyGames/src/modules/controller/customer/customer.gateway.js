const { hashPassword } = require("../../../utils/functions");
const { query } = require("../../../utils/mysql");

const findAll = async () => {
  const sql = `SELECT * from customers;`;
  return await query(sql, []);
};

const findById = async (customer_id) => {
  const sql = `SELECT * from customers WHERE customer_id=?;`;
  return await query(sql, [customer_id]);
};

const save = async (customer) => {
  if (
    !customer.customer_name ||
    !customer.customer_password ||
    !customer.customer_email ||
    !customer.customer_address ||
    !customer.customer_phone
  )
    throw Error("Missing fields");
  const hashedPassword = await hashPassword(customer.customer_password);
  const sql = `INSERT INTO customers (customer_name, customer_password, customer_email, customer_address, customer_phone) VALUES (?,?,?,?,?);`;
  const { insertId } = await query(sql, [
    customer.customer_name,
    hashedPassword,
    customer.customer_email,
    customer.customer_address,
    customer.customer_phone,
  ]);
  delete customer.password;
  return { ...customer, id: insertId };
};

const update = async (customer) => {
  if (
    !customer.customer_name ||
    !customer.customer_password ||
    !customer.customer_email ||
    !customer.customer_address ||
    !customer.customer_phone ||
    !customer.customer_id
  )
    throw Error("Missing fields");
  console.log(customer);
  const sql = `UPDATE customers SET customer_name=?, customer_password=?, customer_email=?, customer_address=?, customer_phone=? WHERE customer_id=?;`;
  const password = await hashPassword(customer.customer_password);
  const { insertId } = await query(sql, [
    customer.customer_name,
    password,
    customer.customer_email,
    customer.customer_address,
    customer.customer_phone,
    customer.customer_id,
  ]);
  delete customer.password;
  return { ...customer, id: insertId };
};

const remove = async (id) => {
  const sql = `DELETE from customers WHERE customer_id=?;`;
  return await query(sql, [id]);
};

module.exports = {
  findAll,
  findById,
  save,
  update,
  remove,
};
