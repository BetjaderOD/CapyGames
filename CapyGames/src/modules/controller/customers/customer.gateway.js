const { hashPassword } = require('../../../utils/functions');
const { query } = require('../../../utils/mysql');

const findAll  = async () => {
    const sql = `SELECT * from customers;`;
    return await query(sql,[]);
}
const findById  = async (customer_id) => {
    const sql = `SELECT * from customers  WHERE customer_id=?;`;
    return await query(sql,[customer_id]);
}
const deleteId  = async (customer_id) => {
    const sql = `DELETE from customers WHERE customer_id=?;`;
    return await query(sql,[customer_id]);
}
const save = async (customer) => {
    console.log(customer);
    if (
        !customer.customer_name||!customer.customer_password|| !customer.customer_email|| !customer.customer_address || !customer.customer_phone
    )
        throw Error('Missing fields');

    const sql = `INSERT INTO customers (customer_name,customer_password,customer_email,customer_address,customer_phone) VAlUES (?,?,?,?,?);`;

    const customer_password = await hashPassword(customer.customer_password);
    const { insertId } = await query(sql, [
        customer.customer_name,
        customer_password,
        customer.customer_email,
        customer.customer_address,
        customer.customer_phone,

    ]);

    delete customer.customer_password;
    return { ...customer, id: insertId };
};
const updateById = async (customer) => {
    console.log(customer);
    if (
        !customer.customer_name||!customer.customer_password|| !customer.customer_email|| !customer.customer_address || !customer.customer_phone
    )
        throw Error('Missing fields');

    const sql = `UPDATE customers SET customer_name=?,customer_password=?,customer_email=?,customer_address=?,customer_phone=? WHERE customer_id=?;`;

    const customer_password = await hashPassword(customer.password);
    const { updateId } = await query(sql, [
        customer.customer_name,
        customer_password,
        customer.customer_email,
        customer.customer_address,
        customer.customer_phone,
    ]);

    delete customer.customer_password;
    return { ...customer, id:updateId };
};
module.exports = {
    save, findAll,deleteId,findById,updateById
};
