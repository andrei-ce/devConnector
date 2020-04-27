const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //Get the token from the header
  const token = req.header('x-auth-token');

  //Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, no access' });
  }
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    //put the token (which has the id) inside a req.user
    req.user = decoded.user;
    //now we can use req.user in any of our protected route!
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
