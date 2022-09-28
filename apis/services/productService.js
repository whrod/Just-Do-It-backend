const { productDao } = require('../models');
const { get } = require('../routes');

const getDetail = async (productId, userId) => {

  const [getStyleCode] = await productDao.getStyleCode(productId);
  const styleCodeFront = getStyleCode.style_code.substring(0, 6)

  if (!getStyleCode) {
    const err = new Error("product is not exists");
    err.statusCode = 400;
    throw err
  }

  const getThumbnail = await productDao.getThumbnail(styleCodeFront)
  const [getDescription] = await productDao.getDescription(productId)

  const getProductOptions = await productDao.getProductOptions(productId)
  const [getReview] = await productDao.getReview(productId)
  let isWished = false;

  if (userId) {
    const [checkWished] = await productDao.isWished(productId, userId)
    if (checkWished) {
      isWished = true;
    }
  }
  getDescription.getThumbnail = getThumbnail;
  getDescription.productOptions = getProductOptions;
  getDescription.review = getReview;
  getDescription.isWished = isWished;

  return getDescription;
}

module.exports = {
  getDetail
}
