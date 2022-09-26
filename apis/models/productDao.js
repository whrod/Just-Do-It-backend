const database = require('./dataSource');

const getImage = async (productId) => {
  try {
    const images = await database.query(
      `SELECT
      product_id,
      image_url AS imageUrl
      FROM product_images
      WHERE product_id = ?
      `, [productId]
    )
    return images;
  }
  catch (err) {
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 500;
    throw error;
  }
}

const getProductOptions = async (productId) => {
  try {
    const data = await database.query(
      `SELECT 
        po.id AS productOptionId,
        s.foot_size AS size,
        po.stock AS stock
      FROM product_options po
      JOIN sizes s ON s.id = po.size_id
      WHERE po.product_id = ?
      `, [productId]
    );
    return data;
  }
  catch (err) {
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 500;
    throw error;
  }
}

const getDescription = async (productId) => {
  try {
    const getDescription = await database.query(
      `SELECT
      b.name AS brandName,
      p.name AS productName,
      p.style_code AS styleCode,
      p.thumbnail AS thumbnail,
      p.description,
      p.retail_price AS retailPrice,
      p.discount_price AS discountPrice,
      c.color AS color
      FROM products p
      JOIN product_options po ON po.product_id = p.id
      JOIN colors c ON c.id = po.color_id
      JOIN brands b ON b.id = p.brand_id
      WHERE p.id = ?
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

const getReview = async (productId) => {
  try {
    return await database.query(
      `SELECT
      r.content,
      star_score AS starScore
      FROM reviews r
      JOIN products p ON p.id = r.product_id
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

const getThumbnail = async (styleCodeFront) => {
  try {
    return await database.query(
      `SELECT
      thumbnail
      FROM products
      WHERE LEFT(style_code,6) = ?
      `, [styleCodeFront]
    )
  }
  catch (err) {
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 500;
    throw error;
  }
}



module.exports = {
  getImage,
  getProductOptions,
  getDescription,
  getReview,
  getStyleCode,
  getThumbnail
}
