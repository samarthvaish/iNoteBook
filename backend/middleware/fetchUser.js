const jwt = require("jsonwebtoken");
const jwt_secret = "!A@D#F$H%M^";

const fetchUser = (req, res, next) => {
  let token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ error: "token invalid" });
  }
  try {
    const data = jwt.verify(token, jwt_secret);
    req.user = data.user;
    next();
  } catch (error) {
    console.log(error.message);
    res.status(401).send({ error: "token invalid" });
  }
};

module.exports = fetchUser;
