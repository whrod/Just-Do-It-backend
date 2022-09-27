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

const checkCartForOrder = async (userId) => {
  const result = await database.query(
    `
    SELECT
        po.id AS productOptionId,
        c.quantity
    FROM product_options po
    JOIN carts c
    ON c.product_option_id = po.id
    WHERE c.user_id = ?
    `,
    [userId]
  );
  console.dir(result);
  return result;
};

const orderInCart = async (productOptionsForOrder, quantityForOrder) => {
  console.log(productOptionsForOrder);
  console.log(quantityForOrder);
  await database.query(
    `
    UPDATE
    product_options
    SET stock = stock - (?)
    WHERE id IN (?)
    `,
    [quantityForOrder, productOptionsForOrder]
  );
  console.log(result.affectedRows);
  return result;
};

module.exports = {
  orderImmediately,
  checkCartForOrder,
  orderInCart,
};
