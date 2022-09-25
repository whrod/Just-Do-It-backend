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

module.exports = {
  orderImmediately,
};
