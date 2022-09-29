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
  getImage,
  getProductOptions,
  getDescription,
  getReview,
  getStyleCode,
  getThumbnail
};

