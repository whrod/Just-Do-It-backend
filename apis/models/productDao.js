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
    return await database.query(
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
    return +result.isWished
  }
  catch (err) {
    const error = new Error(`INVALID_DATA_INPUT`);
    error.statusCode = 500;
    throw error;
  }
}
const getProducts = async (sort, color, brand, size, limit, offset) => {
  let statementWhere = 'WHERE po.stock != 0';

  if (size !== undefined)
    statementWhere += ` AND s.foot_size IN(` + String(size) + `)`;
  if (color !== undefined)
    statementWhere += ` AND c.id IN(` + String(color) + `)`;
  if (brand !== undefined)
    statementWhere += ` AND b.id IN(` + String(brand) + `)`;
  if (size === undefined && color === undefined && brand === undefined) {
    statementWhere = '';
  }

  if (sort !== undefined) {
    sort += ` ,p.id desc`;
  } else sort = `releaseDate desc ,p.id desc`;

  const products = await database.query(
    `
    SELECT distinct  
        p.id,
        b.name AS brandName,
        c.color,
        p.name AS productName, 
        p.style_code AS styleCode, 
        p.retail_price AS retailPrice, 
        p.discount_price AS discountPrice,
        ifnull(discount_price, retail_price) AS price,
        CASE WHEN 
        ((retail_price - ifnull(discount_price,0))/retail_price)*100 = 100  
        THEN 
        0 
        ELSE 
        ((retail_price - ifnull(discount_price,0))/retail_price)*100  
        END AS discountRate, 
        b.name AS brandName, 
        p.release_date AS releaseDate, 
        p.description, 
        p.thumbnail
    FROM product_options po
    JOIN colors c on c.id = po.color_id
    JOIN products p on po.product_id = p.id
    JOIN brands b on p.brand_id = b.id
    JOIN sizes s on s.id = po.size_id
    ${statementWhere}
    ORDER BY ${sort}
    LIMIT ? 
    OFFSET ?;
    `,
    [limit, offset]
  );

  return await products;
};

module.exports = {
  getProducts,
  getProductOptions,
  getProduct,
  getReviewList,
  getStyleCode,
  getRelatedProducts,
  isWished
}
