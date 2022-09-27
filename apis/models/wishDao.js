const database = require('./dataSource');

const createWish = async (productId, userId) => {
  try {
    return await database.query(
      `INSERT INTO wishlist(
        product_id,
        user_id
        ) VALUES(?, ?)
    `, [productId, userId]
    );
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
}

const showWish = async (userId) => {
  try {
    return await database.query(
      `SELECT
      p.thumbnail AS thumbnail,
      p.name AS name,
      IFNULL(p.discount_price, p.retail_price) AS price,
      u.id AS userId
      FROM products p
      JOIN wishlist w ON w.product_id = p.id
      JOIN users u ON u.id = w.user_id
      WHERE w.user_id = ?
    `, [userId]
    );
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
  checkWishlist,
  showWish
}