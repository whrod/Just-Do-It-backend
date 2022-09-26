const database = require('./dataSource');

const getProducts = async (
  sortColumn,
  sortOption,
  statementWhere,
  limit,
  offset
) => {
  const products = await database.query(
    `
    SELECT distinct  
        p.id,
        b.name AS brandName,
        c.color,
    CASE WHEN
        s.foot_size !=0
    THEN 
        1
    ELSE 0
    END AS sizeStock,      
        p.name AS productName, 
        p.style_code AS styleCode, 
        p.retail_price AS retailPrice, 
        p.discount_price AS discountPrice,
        ifnull(discount_price, retail_price) AS sellPrice,
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
    FROM 
        product_options po
    JOIN 
        colors c on c.id = po.color_id
    JOIN 
        products p on po.product_id = p.id
    JOIN 
        brands b on p.brand_id = b.id
    JOIN 
        sizes s on s.id = po.size_id
    ${statementWhere}
    ORDER BY 
    ${sortColumn} ${sortOption}
    LIMIT 
        ? 
    OFFSET 
        ?;
    `,
    [limit, offset]
  );

  return await products;
};

module.exports = {
  getProducts,
};
