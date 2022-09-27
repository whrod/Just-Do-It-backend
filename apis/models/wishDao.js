const database = require('./dataSource');

const createWish = async (productId) => {
  try {
    return await database.query(
      `INSERT INTO wishlist(
        products_id,
        user_id)
        (SELECT users.username 
        FROM users u LEFT JOIN wishlist w
        ON u.id = w.user_id
        WHERE w.user_id IS NULL
        )
        VALUES(?, ?)
    `,
      [productId, userName]
    );


    //   return await database.query(
    //     `SELECT
    //   p.thumbnail AS thumbnail,
    //   p.name AS productName,
    //   IFNULL(p.discount_price, p.retail_price) AS price
    //   FROM products p
    //   WHERE p.id = ?
    // `, [productId]
    //   )
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
}

const removeWish = async (productId, userName) => {
  try {
    return await database.query(
      `DELETE
      FROM wishlist AS wishList
      WHERE product_id = ?
  `, [productId]
    )
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
}

const checkWishlist = async (productId, userName) => {
  try {
    return await database.query(
      `SELECT
      product_id
      FROM wishlist
      WHERE product_id = ?
      `, [productId]
    )
  }
  catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
}
module.exports = {
  createWish,
  removeWish,
  checkWishlist
}