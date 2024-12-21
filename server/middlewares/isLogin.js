import jwt from 'jsonwebtoken';

const isLogin = (req, res, next) => {
  const token = req.cookies.AuthToken;

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, "Taha1233-----313-----------Pak------------muslim----------------");
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default isLogin;
