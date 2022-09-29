const { productDao } = require('../models');

const getDetail = async (productId, userId) => {
  //1. product 상세정보
  /**
   * - product options
   * - review
   * - isWished
   */
  //2. 해당상품과 관련된 상품들의 정보 : 썸네일
  const product = await productDao.getProduct(productId)


  if (!product) {
    const err = new Error("product is not exists");
    err.statusCode = 404;
    throw err

  }
  const ProductOptions = await productDao.getProductOptions(productId)
  const productReviewList = await productDao.getReviewList(productId);
  const isWished = Boolean(await productDao.isWished(productId, userId))

  const styleCode = product.styleCode.substring(0, 6)

  const relatedProducts = await productDao.getRelatedProducts(styleCode)
  /**
   * [{productId : 1, thumbnail : 'sdsdsd'}, {}, {}]
   */

  //const [getStyleCode] = await productDao.getStyleCode(productId);
  //const styleCodeFront = getStyleCode.style_code.substring(0, 6)
  // if (!getStyleCode) {
  //   const err = new Error("product is not exists");
  //   err.statusCode = 404;
  //   throw err
  //}
  const [getThumbnail] = await productDao.getThumbnail(styleCodeFront)
  const [getDescription] = await productDao.getProduct(productId)

  const [getReview] = await productDao.getReview(productId)
  // let isWished = false;


  getDescription.relatedProducts = relatedProducts;
  getDescription.productOptions = productOptions;
  getDescription.review = productReview;
  getDescription.isWished = isWished;

  return getDescription;
}

module.exports = {
  getDetail
}
