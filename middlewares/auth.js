const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");
    // no token send
    if (!token) return res.status(400).json({ msg: "invalid authentication" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      // wrong token
      if (err) return res.status(400).json({ msg: "invalid authentication" });

      // set data to req.user
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = auth;
