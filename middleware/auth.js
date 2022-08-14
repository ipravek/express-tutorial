const jwt = require("jsonwebtoken");

const { TOKEN_KEY } = process.env;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1] || req.body.token;

  if (!token) return res.status(401).json({ message: "token required" });

  try {
    const decoded = jwt.verify(token, TOKEN_KEY);
    req.user = decoded;
  } catch (e) {
    return res.status(401).json({ message: "invalid token" });
  }

  return next();
};

module.exports = verifyToken;
