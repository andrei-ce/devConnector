const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //Get the token from header
  const token = req.header('x-auth-token');
  //Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, no access' });
  }
  //Verify token
  try {
    jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
      if (error) {
        res.status(401).json({ msg: 'Invalid Token' });
      } else {
        //put the token (which has the id) inside a req.user
        req.user = decoded.user;
        //now we can use req.user.id in any of our protected routes!
        next();
      }
    });
  } catch (err) {
    console.lerror('Auth middleware problems...');
    res.status(500).json({ msg: 'Server error' });
  }
};
