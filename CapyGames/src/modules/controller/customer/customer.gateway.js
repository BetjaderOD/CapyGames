const { hashPassword } = require("../../../utils/functions");
const { query } = require("../../../utils/mysql");

const findAll = async () => {
  const sql = `SELECT * from customers;`;
  return await query(sql, []);
};

const findById = async (id) => {
  const sql = `SELECT * from customers WHERE customer_id=?;`;
  return await query(sql, [id]);
};

const save = async (customer) => {
  if (
    !customer.name ||
    !customer.password ||
    !customer.email ||
    !customer.address ||
    !customer.phone
  )
    throw Error("Missing fields");
  const hashedPassword = await hashPassword(customer.password);
  const sql = `INSERT INTO users (customer_id, customer_name, customer_password, customer_email, customer_address, customer_phone) VALUES (?,?,?,?,?,?);`;
  const { insertId } = await query(sql, [
    customer.customer_id,
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
    !customer.customer_phone
  )
    throw Error("Missing fields");
  const hashedPassword = await hashedPassword(customer.password);
  const sql = `UPDATE customers SET customer_name=?, customer_password=?, customer_email=?, customer_address=?, customer_phone=? WHERE customer_id=?;`;
  const { insertId } = await query(sql, [
    customer.customer_name,
    customer_password,
    customer.customer_email,
    customer.customer_address,
    customer.customer_phone,
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
