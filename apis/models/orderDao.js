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

module.exports = {
  orderInDetail,
  orderInCart,
};
