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

const getProductOptions = async (productId) => {
  const result = await database.query(
    `
    SELECT
        po.id AS productOptionId,
        s.foot_size AS size,
	      stock
    FROM product_options po
    LEFT JOIN products p
    ON p.id = po.product_id
    JOIN sizes s
    ON s.id = po.size_id
    WHERE p.id = ?
    `,
    [productId]
  );
  return result;
};

const getDescription = async (cartId, userId) => {
  const [result] = await database.query(
    `
    SELECT
        p.id AS productId,
        p.brand_id AS brandId,
        b.name AS brandName,
        JSON_ARRAYAGG(image_url) AS images
    FROM products p
    JOIN brands b
    ON b.id = p.brand_id
    JOIN product_images pi
    ON p.id = pi.product_id
    JOIN product_options po
    ON po.product_id = p.id
    JOIN carts c
    ON c.product_option_id = po.id
    WHERE c.id = ?
    AND c.user_id = ?
    `,
    [cartId, userId]
  );
  return result;
};

const getStock = async (productOptionId) => {
  const [productOption] = await database.query(
    `
    SELECT
        stock
    FROM product_options
    WHERE id = ?    
    `,
    [productOptionId]
  );
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
  return result;
};

const deleteAllCarts = async (userId) => {
  await database.query(
    `
    DELETE FROM
        carts
    WHERE user_id = ?
    `,
    [userId]
  );
};

module.exports = {
  getCartsByUserId,
  getStock,
  getDescription,
  getProductOptions,
  postCart,
  checkIfTheCartExists,
  updateQuantityWhenPostCart,
  updateCart,
  deleteCart,
  deleteAllCarts,
};
