/*로그인 리콰이어드
토큰 헤더에 있는지 체크
토큰이 verify (페이로드 확인)
유저가 존재하는지
엑세스 허용*/

// const jwt = require('jsonwebtoken');
// const { userService } = require('../services');
// const { catchAsync } = require('../utils/error');

// const loginRequired = async (req, res) => {
//   const accessToken = req.header.authorization;

//   if (!accessToken) {
//     const error = new Error('NEED_ACCESSTOKEN');
//     error.statusCode = 401;

//     throw error;
//   }
//   const verifyToken = jwt.verify(accessToken, process.env.JWT_SECRET);
//   const user = await userService.getUserById(verifyToken.id);

//   if (!user) {
//     const error = new Error('USER_DOES_NOT_EXIST');
//     error.statusCode = 400;

//     throw error;
//   }

//   req.user = user;
//   next();
// };

module.exports = {
  loginRequired,
};
