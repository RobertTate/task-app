const jwt = require('jsonwebtoken');
const User = require('../models/user');

/**
 * Checks if a request is authentic and tied to a real user. If so, that user is added to the request object, at `req.user`.
 * @param {import('express').Request} req The express request object
 * @param {import('express').Response} res The express response object
 * @param {import('express').NextFunction} next The express next function
 */
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch(e) {
    res.status(401).send({ 'error': 'Please Authenticate.'});
  };
};

module.exports = authMiddleware
