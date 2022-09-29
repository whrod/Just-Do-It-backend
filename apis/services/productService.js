const { productDao } = require('../models');

const getDetail = async (productId, userId) => {

  const [product] = await productDao.getProduct(productId)
  if (!product) {
    const err = new Error("product is not exists");
    err.statusCode = 404;
    throw err
  }

  const productOptions = await productDao.getProductOptions(productId)
  const productReview = await productDao.getReviewList(productId);
  const isWished = Boolean(await productDao.isWished(productId, userId))
  const styleCode = product.styleCode.substring(0, 6)
  const relatedProducts = await productDao.getRelatedProducts(styleCode)

  product.relatedProducts = relatedProducts;
  product.productOptions = productOptions;
  product.review = productReview;
  product.isWished = isWished;

  return product;
}


const getProducts = async (sort, color, brand, size, limit, offset) => {
  return await productDao.getProducts(sort, color, brand, size, limit, offset);
};

module.exports = {
  getProducts,
  getDetail
};
