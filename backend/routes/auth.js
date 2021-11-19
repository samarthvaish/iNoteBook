const express = require("express");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_secret = "!A@D#F$H%M^";
const fetchUser = require("../middleware/fetchUser");

hash = async (req) => {
  let salt = await bcrypt.genSalt(10);
  let secPass = await bcrypt.hash(req.body.password, salt);
  return secPass;
};

createUser = async (req, secPass) => {
  let user = await User.create({
    name: req.body.name,
    password: secPass,
    email: req.body.email,
  });
  return user;
};

createJWTToken = async (data) => {
  return jwt.sign(data, jwt_secret);
};

findUser = async (req) => {
  let user = await User.findOne({ email: req.body.email });
  return user;
};

createData = async (user) => {
  let data = {
    user: {
      id: user.id,
    },
  };
  return data;
};

router.post(
  "/createUser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isLength({ min: 5 }),
    body("name", "Enter a valid name").isLength({ min: 3 }),
  ],
  async (req, res) => {
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await findUser(req); //await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ error: "This email is already used" });
    }
    let secPass = await hash(req);
    user = createUser(req, secPass);
    let data = await createData(user);
    // let data = {
    //   user: {
    //     id: user.id,
    //   },
    // };
    let jwtToken = await createJWTToken(data); //jwt.sign(data, jwt_secret);
    res.json({ user: "Successfully Created", jwt: jwtToken });
  }
);

router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { email, password } = req.body;
      let user = await findUser(req); //await User.findOne({ email: req.body.email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please enter correct credentials" });
      } else {
        let correctCred = await bcrypt.compare(password, user.password);
        if (!correctCred) {
          return res
            .status(400)
            .json({ error: "Please enter correct credentials" });
        }
        let data = await createData(user);
        let jwtToken = await createJWTToken(data); //jwt.sign(data, jwt_secret);
        res.json({ user: "Logged in Successfully", jwt: jwtToken });
      }
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  }
);

router.post("/getuser", fetchUser, async (req, res) => {
  try {
    userId = req.user.id;
    const user = await User.findOne({ id: userId }).select("-password");
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
