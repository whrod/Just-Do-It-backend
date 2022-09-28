const database = require('./dataSource');
const { affectedRowsErrorHandler } = require('../utils/error');

const orderInDetail = async (productOptionId, quantity) => {
  const result = await database.query(
    `
    UPDATE 
        product_options
    SET
        stock = stock - ?
    WHERE id = ?
    `,
    [quantity, productOptionId]
  );
  affectedRowsErrorHandler(result);
  return result;
};

const orderInCart = async (userId) => {
  const result = await database.query(
    `
    UPDATE
        product_options po
    JOIN carts c
        ON c.product_option_id = po.id
    SET
        po.stock = po.stock - c.quantity
    WHERE c.user_id = ?
    `,
    [userId]
  );
  return result.affectedRows;
};

const checkCartForOrder = async (userId) => {
  const result = await database.query(
    `
    SELECT
    c.product_option_id AS productOptionId,
    c.quantity,
    po.stock
    FROM carts c
    JOIN product_options po
    ON c.product_option_id = po.id
    WHERE user_id = ?
    `,
    [userId]
  );
  return result;
};

const deleteCart = async (userId, productOptionId) => {
  const result = await database.query(
    `
    DELETE
    FROM
    carts
    WHERE user_id = ? 
    AND
    product_option_id = ?
    `,
    [userId, productOptionId]
  );
  return result;
};

const deleteAllCarts = async (userId) => {
  const result = await database.query(
    `
    DELETE
    FROM
    carts
    WHERE user_id = ?
    `,
    [userId]
  );
  return result;
};

module.exports = {
  orderInDetail,
  orderInCart,
  checkCartForOrder,
  deleteCart,
  deleteAllCarts,
};
