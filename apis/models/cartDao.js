const database = require('../models/dataSource');
const { affectedRowsErrorHandler } = require('../utils/error');

const getCartsByUserId = async (userId) => {
  const cart = await database.query(
    `
    SELECT
        c.id AS cartId,
        c.user_id AS userId,
        p.style_code AS styleCode,
        c.quantity,
        c.product_option_id AS productOptionId,
        p.id AS productId,
        p.name AS productName,
        po.size_id AS sizeId,
        s.foot_size AS size,
        po.stock,
        p.retail_price AS retailPrice,
        p.discount_price AS discountPrice,
        p.thumbnail
    FROM carts c
    JOIN product_options po
    ON po.id = c.product_option_id
    JOIN products p
    ON po.product_id = p.id
    JOIN sizes s
    ON po.size_id = s.id
    WHERE c.user_id = ?
    `,
    [userId]
  );
  return cart;
};

const getProductOption = async (productOptionId) => {
  const productOption = await database.query(
    `
    SELECT
        stock
    FROM product_options   
    WHERE id = ?    
    `,
    [productOptionId]
  );
  console.log(productOption);
  return productOption;
};

const postCart = async (productOptionId, userId, quantity) => {
  const result = await database.query(
    `
    INSERT INTO carts (
        product_option_id,
        user_id,
        quantity
    ) VALUE (
      ?, ?, ?
    )
    `,
    [productOptionId, userId, quantity]
  );

  await affectedRowsErrorHandler(result);
  return result;
};

const checkIfTheCartExists = async (productOptionId, userId) => {
  const [result] = await database.query(
    `
    SELECT
        id AS cartId,
        product_option_id AS productOptionId,
        user_id AS userId
    FROM carts
    WHERE product_option_id = ?
    AND user_id = ?
    `,
    [productOptionId, userId]
  );
  return result;
};

const updateQuantityWhenPostCart = async (
  quantity,
  productOptionId,
  userId,
  cartId
) => {
  const result = await database.query(
    `
    UPDATE 
        carts
    SET
        quantity = ?
    WHERE product_option_id = ?
    AND user_id = ?
    AND id = ?
    `,
    [quantity, productOptionId, userId, cartId]
  );
  await affectedRowsErrorHandler(result);
  return result;
};

const updateCart = async (productOptionId, userId, quantity, cartId) => {
  const result = await database.query(
    `
    UPDATE
        carts
    SET
        product_option_id = ?,
        quantity = ?
    WHERE user_id = ?
    AND id = ?
    `,
    [productOptionId, quantity, userId, cartId]
  );
  await affectedRowsErrorHandler(result);
  return result;
};

const deleteCart = async (userId, cartId) => {
  const result = await database.query(
    `
    DELETE FROM
        carts
    WHERE user_id = ?
    AND
    id = ?
    `,
    [userId, cartId]
  );
  await affectedRowsErrorHandler(result);
};

module.exports = {
  getCartsByUserId,
  getProductOption,
  postCart,
  checkIfTheCartExists,
  updateQuantityWhenPostCart,
  updateCart,
  deleteCart,
};
