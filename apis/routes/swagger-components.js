/**
 * @swagger
 * components:
 *   schemas:
 *     CartExample:
 *       type: object
 *       properties:
 *         result:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               cartId:
 *                 type: integer
 *                 description: Unique ID of the cart
 *                 example: 41
 *               userId:
 *                 type: integer
 *                 description: User ID associated with the cart
 *                 example: 16
 *               styleCode:
 *                 type: string
 *                 description: The SKU code of the product
 *                 example: DR1020-400
 *               quantity:
 *                 type: integer
 *                 minimum: 1
 *                 default: 1
 *               productOptionId:
 *                 description: ID that is a combination of size and product
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 456
 *               productId:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 19
 *               productName:
 *                 type: string
 *                 example: 나이키 ACG 에어 데슈츠+ SE
 *               sizeId:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 24
 *               size:
 *                 type: string
 *                 example: 360
 *               stock:
 *                 type: integer
 *                 minimum: 1
 *                 default: 1
 *               retailPrice:
 *                 type: string
 *                 example: 99000
 *               discountPrice:
 *                 description: Discount price Null if no discount
 *                 type: string
 *               thumbnail:
 *                 description: Thumbnail image url
 *                 type: string
 *                 example: https://raw.githubusercontent.com/whrod/1stprojectImages/main/DR1020-400_1.jpg
 *
 *     CartOrProductStatusChange:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Message about the cart being created or updated
 *           example: Cart was created. || Cart was updated. || Cart was deleted. || One order was created.
 *         userId:
 *           type: integer
 *           description: User ID associated with the cart
 *           example: 16
 *         productOptionId:
 *           type: integer
 *           description: Product option ID associated with the cart
 *           example: 450
 *
 *     CartClearedResult:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Message about the cart were all cleared.
 *           example: All carts were deleted
 *         userId:
 *           type: integer
 *           description: User ID associated with the cart
 *           example: 16
 *
 *     OrderCartsResult:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Message about all carts were ordered.
 *           example: All cart orders were placed.
 *         userId:
 *           type: integer
 *           description: User ID associated with the cart
 *           example: 16
 *         numberOfOrder:
 *           type: integer
 *           description: The number of carts ordered by the user
 *           example: 2
 *
 *     OneCartDetailForChangingOption:
 *       type: object
 *       properties:
 *         productId:
 *           type: integer
 *           description: Unique ID of the product
 *           example: 19
 *         brandId:
 *           type: integer
 *           description: Unique ID of the brand
 *           example: 1
 *         brandName:
 *           type: string
 *           description: Name of the brand
 *           example: ACG
 *         images:
 *           type: array
 *           description: List of product images
 *           items:
 *             type: string
 *             example: https://raw.githubusercontent.com/whrod/1stprojectImages/main/DR1020-400_1.jpg
 *         productOptions:
 *           type: array
 *           description: List of product options
 *           items:
 *             type: object
 *             properties:
 *               productOptionId:
 *                 type: integer
 *                 description: Unique ID of the product option
 *                 example: 433
 *               size:
 *                 type: string
 *                 description: Size of the product
 *                 example: 220
 *               stock:
 *                 type: integer
 *                 description: Number of products in stock
 *                 example: 0
 *
 *     productList:
 *       type: object
 *       properties:
 *         list:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               brandName:
 *                 type: string
 *               color:
 *                 type: string
 *               productName:
 *                 type: string
 *               styleCode:
 *                 type: string
 *               retailPrice:
 *                 type: string
 *               discountPrice:
 *                 type: string
 *               price:
 *                 type: string
 *               discountRate:
 *                 type: string
 *               releaseDate:
 *                 type: string
 *               description:
 *                 type: string
 *               thumbnail:
 *                 type: string
 *       example:
 *         list:
 *          - id: 10
 *            brandName: 조던
 *            color: purple
 *            productName: 에어 조던 1 레트로 하이 OG
 *            styleCode: 555088-706
 *            retailPrice: 209000
 *            discountPrice: 135900
 *            price: 135900
 *            discountRate: 34.9761
 *            releaseDate: 2022-09-09T15:00:00.000Z
 *            description: 친숙하지만 늘 새로운 아이콘인 에어 조던 1이 오늘날의 스니커즈 수집 마니아들을 위해 재탄생했습니다. 레트로 하이 OG 버전은 풀그레인 가죽과 편안한 쿠셔닝, 클래식한 디테일이 조화롭게 어우러진 디자인을 완성합니다.",
 *            thumbnail: https://raw.githubusercontent.com/whrod/1stprojectImages/main/555088-180_1.jpg
 *
 *     ProductDetail:
 *       type: object
 *       properties:
 *         productId:
 *           type: integer
 *           description: Id of the product
 *         brandName:
 *           type: string
 *           description: Brand name of the product
 *         productName:
 *           type: string
 *           description: Name of the product
 *         styleCode:
 *           type: string
 *           description: Style code of the product
 *         description:
 *           type: string
 *           description: Description of the product
 *         retailPrice:
 *           type: string
 *           description: Retail price of the product
 *         discountPrice:
 *           type: string
 *           description: Discount price of the product
 *         imageURL:
 *           type: array
 *           description: List of images of the product
 *           items:
 *             type: string
 *             description: URL of the image
 *         relatedProducts:
 *           type: array
 *           description: List of related products
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *                 description: Id of the product
 *               thumbnail:
 *                 type: string
 *         productOptions:
 *           type: array
 *           description: List of product options
 *           items:
 *             type: object
 *             properties:
 *               productOptionId:
 *                 type: integer
 *                 description: Id of the product option
 *               size:
 *                 type: string
 *                 description: Size of the product
 *               stock:
 *                 type: integer
 *                 description: Stock of the product
 *         review:
 *           type: array
 *           description: List of reviews
 *           items:
 *             type: object
 *         isWished:
 *           type: boolean
 *           description: Whether the product is wished or not
 *         color:
 *           type: string
 *           description: Color of the product
 *
 *   requestBodies:
 *     ProductOptionsAndQuantity:
 *       type: object
 *       required:
 *         - productOptionId
 *         - quantity
 *       properties:
 *         productOptionId:
 *           type: integer
 *           minimum: 1
 *           maximum: 456
 *         quantity:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *
 *   responses:
 *     400:
 *       description: Bad request.
 *     5XX:
 *       description: Unexpected error.
 *
 *   parameters:
 *     cartId:
 *       name: cartId
 *       in: path
 *       required: true
 *       type: integer
 *
 *     productId:
 *       name: productId
 *       in: path
 *       required: true
 *       type: integer
 *       minimum: 1
 *       maximum: 19
 *
 *     Offset:
 *       name: offset
 *       in: query
 *       required: true
 *       type: integer
 *       default: 0
 *       minimum: 0
 *
 *     Limit:
 *       name: limit
 *       in: query
 *       required: true
 *       type: integer
 *       default: 20
 *       minimum: 1
 *       maximum: 20
 *
 *     Sort:
 *       name: sort
 *       in: query
 *       required: false
 *       schema:
 *         type: string
 *         enum: [discountRate desc, price asc, price desc, releaseDate desc]
 *         default: releaseDate desc
 *
 *     Size:
 *       name: size
 *       in: query
 *       schema:
 *         type: array
 *         items:
 *           type: integer
 *       collectionFormat: multi
 *       value:
 *       - 220
 *       - 225
 *       - 230
 *       - 240
 *       - 245
 *       - 250
 *       - 255
 *       - 260
 *       - 265
 *       - 270
 *       - 275
 *       - 280
 *       - 285
 *       - 290
 *       - 295
 *       - 300
 *       - 305
 *       - 310
 *
 *     Color:
 *       name: color
 *       in: query
 *       schema:
 *         type: array
 *         items:
 *           type: integer
 *       collectionFormat: multi
 *       value:
 *       - 1
 *       - 2
 *       - 3
 *       - 4
 *       - 5
 *       - 6
 *       - 7
 *       - 8
 *       - 9
 *       - 10
 *       - 11
 *       - 12
 *
 *     Brand:
 *       name: brand
 *       in: query
 *       schema:
 *         type: array
 *         items:
 *           type: integer
 *       collectionFormat: multi
 *       value:
 *         - 1
 *         - 2
 *         - 3
 */
