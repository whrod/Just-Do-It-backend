const database = require('../models/dataSource');
const { affectedRowsErrorHandler } = require('../utils/error');

//이미지 필요, product_option 필요, stock 필요
const getCartByUserId = async (userId) => {
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
    FROM 
        carts c
    JOIN
        product_options po
    ON
        po.id = c.product_option_id
    JOIN
        products p
    ON 
        po.product_id = p.id
    JOIN 
        sizes s
    ON 
        po.size_id = s.id
    WHERE 
        c.user_id = ?
    `,
    [userId]
  );
  return cart;
};

//카트에 담긴 제품의 옵션, 이미지 select 구현중
const getDetailInCart = async (a) => {
  const b = [];
  for (let i = 0; i < a.length; i++) {
    const result = await database.query(
      `
    SELECT image_url
    FROM product_images pi
    JOIN products p ON pi.product_id = p.id
    WHERE p.id = ? `,
      [a[i]]
    );
    b.push(result);
    console.log(b);
    return b;
  }
};

//productOptionId로 stock 구할때
const getProductOption = async (productOptionId) => {
  const [productOption] = await database.query(
    `
    SELECT
        product_id,
        size_id,
        color_id,
        stock
    FROM product_options   
    WHERE id = ?    
    `,
    [productOptionId]
  );
  return productOption;
};

//productId, sizeId로 productOption구할때
const getProductOptionBySelect = async (productId, sizeId) => {
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

//장바구니 Post
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

  affectedRowsErrorHandler(result);
  return result;
};

//장바구니 Post시 카트에 같은 옵션의 제품이 있을 경우 cart id, product_option_id 체크
const checkIfTheCartExists = async (productOptionId, userId) => {
  const [result] = await database.query(
    `
    SELECT
        id AS cartId,
        product_option_id AS productOptionId
    FROM
        carts
    WHERE
        product_option_id = ?
    AND
        user_id = ?
    `,
    [productOptionId, userId]
  );

  return result;
};

//장바구니 Post시 카트에 같은 옵션의 제품이 있을 경우 수량만 변경
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
    WHERE
        product_option_id = ?
    AND
        user_id = ?
    AND
        id = ?
    `,
    [quantity, productOptionId, userId, cartId]
  );
  affectedRowsErrorHandler(result);
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
    WHERE
        user_id = ?
    AND
        id = ?
    `,
    [productOptionId, quantity, userId, cartId]
  );
  affectedRowsErrorHandler(result);
  return result;
};

const deleteCart = async (cartId) => {
  const result = await database.query(
    `
    DELETE FROM
        carts
    WHERE
        id = ?
    `,
    [cartId]
  );
  affectedRowsErrorHandler(result);
};

module.exports = {
  getCartByUserId,
  getDetailInCart,
  getProductOption,
  getProductOptionBySelect,
  postCart,
  checkIfTheCartExists,
  updateQuantityWhenPostCart,
  updateCart,
  deleteCart,
};
