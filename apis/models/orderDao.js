const database = require('./dataSource');
const { affectedRowsErrorHandler } = require('../utils/error');

const orderImmediately = async (productOptionId, quantity) => {
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

const checkProduct = async (userId) => {
  const result = await database.query(
    `
    SELECT
        po.id AS productOptionId
    FROM product_options po
    JOIN carts c
    ON c.product_option_id = po.id
    WHERE c.user_id = ?
    `,
    [userId]
  );
  return result;
};

module.exports = {
  orderImmediately,
  checkProduct,
};
