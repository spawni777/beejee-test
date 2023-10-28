const { verifyJwt } = require('../services/jwt');
const {AUTH_COOKIE_NAME} = require('../configs/app.config');
const db = require('../db');

const auth = async (req, res, next) => {
  try {
    if (!req.path.includes('/admin')) {
      return next();
    }

    const authToken = req.signedCookies[AUTH_COOKIE_NAME];

    if (!authToken) {
      return res.redirect('/login');
    }

    const { userId } = verifyJwt(authToken);

    if (!userId) {
      return res.redirect('/login');
    }

    const user = await db.users.findByPk(userId);

    if (!user) {
      return res.redirect('/login');
    }

    return next();
  } catch (err) {
    console.log(err.message);
    next(err);
  }
}

module.exports = {
  priority: 100,
  function: auth,
}
