const database = require('./dataSource');

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
};
