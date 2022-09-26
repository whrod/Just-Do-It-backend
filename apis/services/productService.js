const { productDao } = require('../models');

const getDetail = async (productId) => {
  const [getStyleCode] = await productDao.getStyleCode(productId);
  const styleCodeFront = getStyleCode.style_code.substring(0, 6)
  if (!getStyleCode) {
    const err = new Error("product is not exists");
    err.statusCode = 400;
    throw err
  }

  const getThumbnail = await productDao.getThumbnail(styleCodeFront)
  const getImage = await productDao.getImage(productId)
  const [getDescription] = await productDao.getDescription(productId)
  const getProductOptions = await productDao.getProductOptions(productId)
  const [getReview] = await productDao.getReview(productId)

  getDescription.getThumbnail = getThumbnail;
  getDescription.imageUrl = getImage;
  getDescription.productOptions = getProductOptions;
  getDescription.review = getReview;

  return getDescription;
}

module.exports = {
  getDetail
}
