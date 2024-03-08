const jwt = require('jsonwebtoken');

const verification = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).send('Access Denied');
  }
  try {
    const decoded = jwt.verify(token, process.env.secretKey);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({
      err: 'Invalid Token',
    });
  }
}

module.exports = {
  verification,
}