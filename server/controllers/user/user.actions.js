const db = require('../../db');
const bcrypt = require('bcrypt');
const { AUTH_COOKIE_NAME } = require('../../configs/app.config');
const { generateJwt } = require('../../services/jwt');

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(422);
      return res.end('Unprocessable Entity');
    }

    const user = await db.users.findOne({ where: { username } });

    if (!user) {
      res.status(404);
      return res.end('Not Found');
    }

    const success = bcrypt.compareSync(password, user?.password);
    console.log(success);

    if (!success) {
      res.status(401);
      return res.end('Unauthorized');
    }

    const authToken = generateJwt({userId: user.id});

    res.cookie(AUTH_COOKIE_NAME, authToken, {
      httpOnly: true,
      maxAge: 604800000, // 1 week
      signed: true,
    })

    return res.send(true);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login
}
