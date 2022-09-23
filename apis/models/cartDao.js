const database = require('../models/dataSource');

const getCartById = async (userId) => {
  const cart = await database.query(
    `
    SELECT DISTINCT
        c.id AS cartId,
        p.name AS productName,
        c.quantity,
        s.foot_size AS size,
        p.retail_price AS retailPrice,
        o.stock,
        p.style_code AS styleCode,
        p.discount_price AS discountPrice,
        p.thumbnail,
        p.id AS productId,
        s.id AS sizeId
    FROM carts c,       product_options o, products p, sizes s
    WHERE c.product_option_id = o.id
    AND o.product_id = p.id 
    AND o.size_id = s.id 
    AND user_id = ?;
    `,
    [userId]
  );
  return cart;
};

const getProductOption = async (productId, sizeId) => {
  const [productOption] = await database.query(
    `SELECT
        id,
        product_id,
        stock
    FROM product_options 
    WHERE 
        product_id = ?
    AND 
        size_id = ?
    `,
    [productId, sizeId]
  );
  return productOption;
};

const postCart = async (productOptionId, userId, quantity) => {
  const result = await database.query(
    `
    INSERT INTO carts 
    (
        product_option_id,
        user_id,
        quantity
    ) VALUE (
      ?, ?, ?
    )
    `,
    [productOptionId, userId, quantity]
  );

  if (result.affectedRows !== 1) {
    const error = new Error('WRONG_INPUT_REQUEST');
    error.statusCode = 400;

    throw error;
  }
  return result;
};

module.exports = {
  getCartById,
  getProductOption,
  postCart,
};
