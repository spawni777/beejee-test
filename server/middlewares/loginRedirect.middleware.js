const { verifyJwt } = require('../services/jwt');
const {AUTH_COOKIE_NAME} = require('../configs/app.config');
const db = require('../db');

const auth = async (req, res, next) => {
  try {
    if (!req.path.includes('/login')) {
      return next();
    }

    const authToken = req.signedCookies[AUTH_COOKIE_NAME];

    if (!authToken) {
      return next();
    }

    const { userId } = verifyJwt(authToken);

    if (!userId) {
      return next();
    }

    const user = await db.users.findByPk(userId);

    if (!user) {
      return next();
    }

    return res.redirect('/admin');
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

module.exports = {
  priority: 90,
  function: auth,
}
