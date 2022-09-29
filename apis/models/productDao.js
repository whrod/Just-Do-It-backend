const database = require('./dataSource');

const getProductOptions = async (productId) => {
  try {
    return await database.query(
      `SELECT 
        po.id AS productOptionId,
        s.foot_size AS size,
        po.stock AS stock
      FROM product_options po
      JOIN sizes s ON s.id = po.size_id
      WHERE po.product_id = ?
      `, [productId]
    );
  }
  catch (err) {
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 500;
    throw error;
  }
}

const getProduct = async (productId) => {
  try {
    const getDescription = await database.query(
      `select 
        p.id AS productId,
        b.name as brandName, 
        p.name AS productName, 
        p.style_code AS styleCode, 
        p.description AS description,
        p.retail_price AS retailPrice, 
        p.discount_price AS discountPrice, 
        JSON_ARRAYAGG(pi.image_url) AS imageURL
      FROM products as p  
      JOIN product_images pi ON pi.product_id = p.id 
      JOIN brands b ON b.id = p.brand_id 
      where p.id =?
      `, [productId]
    )
    return getDescription;
  }
  catch (err) {
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 500;
    throw error;
  }
}

const getReviewList = async (productId) => {
  try {
    return await database.query(
      `SELECT
        r.content,
        r.star_score AS starScore,
        r.created_at AS createdAt,
        u.fullname AS fullName
      FROM reviews r
      JOIN products p ON p.id = r.product_id
      JOIN users u ON u.id = r.user_id
      WHERE r.product_id = ? 
      `, [productId]
    )
  }
  catch (err) {
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 500;
    throw error;
  }
}

const getStyleCode = async (productId) => {
  try {
    return await database.query(
      `SELECT
        style_code
      FROM products
      WHERE products.id = ?
      `, [productId]
    )
  }
  catch (err) {
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 500;
    throw error;
  }
}

const getRelatedProducts = async (styleCode) => {
  try {
    return await database.query(
      `SELECT
      p.id AS productId,
      p.thumbnail
      FROM products p
      WHERE LEFT(p.style_code,6) = ?
      `, [styleCode]
    )
  }
  catch (err) {
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 500;
    throw error;
  }
}

const isWished = async (productId, userId) => {
  try {
    const [result] = await database.query(
      `SELECT EXISTS(
        SELECT(
          id
          )
        FROM wishlist
      WHERE product_id = ? AND user_id = ? 
      )AS isWished
      `, [productId, userId]
    )
    return result;
  }
  catch (err) {
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 500;
    throw error;
  }
}

module.exports = {
  getProductOptions,
  getProduct,
  getReviewList,
  getStyleCode,
  getRelatedProducts,
  isWished
}
