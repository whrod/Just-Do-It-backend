const database = require('./dataSource');

const getImage = async (productId) => {
  try {
    const images = await database.query(
      `SELECT
        product_id AS productId,
        JSON_ARRAYAGG(image_url) AS imageUrlFunc
      FROM product_images
      GROUP BY product_id
      HAVING product_id = ?
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
        distinct
        b.name AS brandName,
        p.name AS productName,
        p.style_code AS styleCode,
        p.thumbnail AS thumbnail,
        p.description,
        p.retail_price AS retailPrice,
        p.discount_price AS discountPrice,
        c.color AS color,
        JSON_ARRAYAGG(pi.image_url) AS imageUrlDes
      FROM products p
      JOIN product_options po ON po.product_id = p.id
      JOIN colors c ON c.id = po.color_id
      JOIN brands b ON b.id = p.brand_id
      JOIN product_images pi ON pi.product_id = p.id
      WHERE p.id = 1
      GROUP BY p.id;
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

const getThumbnail = async (getStyleCode) => {
  try {
    return await database.query(
      `SELECT
      JSON_ARRAYAGG(thumbnail) AS thumbnail
      FROM products
      WHERE LEFT(style_code,6) = ?
      `, [getStyleCode]
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
    return await database.query(
      `SELECT
        user_id,
        product_id
      FROM wishlist
      WHERE product_id = ? AND user_id = ? 
      `, [productId, userId]
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
  getThumbnail,
  isWished
}

// SELECT
// distinct
// b.name AS brandName,
//   p.name AS productName,
//     p.style_code AS styleCode,
//       p.thumbnail AS thumbnail,
//         p.description,
//         p.retail_price AS retailPrice,
//           p.discount_price AS discountPrice,
//             ANY_VALUE(c.color) AS color,
//               JSON_ARRAYAGG(pi.image_url) AS imageUrl
//       FROM products p
//       JOIN product_options po ON po.product_id = p.id
//       JOIN colors c ON c.id = po.color_id
//       JOIN brands b ON b.id = p.brand_id
//       JOIN product_images pi ON pi.product_id = p.id
//       WHERE p.id = 1
//       GROUP BY pi.product_id;


//  SELECT
//  b.name AS brandName,
//  p.name AS productName,
//  p.style_code AS styleCode,
//     p.thumbnail AS thumbnail,
//       p.description,
//       p.retail_price AS retailPrice,
//         p.discount_price AS discountPrice,
//           JSON_ARRAYAGG(pi.image_url) AS imageUrl
//     FROM products p
//     JOIN product_options po ON po.product_id = p.id
//     JOIN brands b ON b.id = p.brand_id
//     JOIN product_images pi ON pi.product_id = p.id
//     WHERE p.id = 1
//     GROUP BY p.id
//     HAVING p.id = 1;



// SELECT
// distinct
// p.name AS productName,
//   p.style_code AS styleCode,
//     p.thumbnail AS thumbnail,
//       p.description,
//       p.retail_price AS retailPrice,
//         p.discount_price AS discountPrice,
//           JSON_ARRAYAGG(pi.image_url) AS imageUrl
//       FROM products p
//       JOIN product_images pi ON pi.product_id = p.id
//       JOIN product_options po ON po.product_id = p.id                                                 
//       WHERE p.id = 1
//       GROUP BY p.id;
