var User = require("../models/user");
var jwt = require("jwt-simple");
require("dotenv").config();

var functions = {
  addNew: (req, res, next) => {
    if (!req.body.name || !req.body.password) {
      res.json({ success: false, message: "Enter all fields" });
    } else {
      var newUser = User({
        name: req.body.name,
        password: req.body.password,
      });
      newUser.save((err, newUser) => {
        if (err)
          return res.json({
            success: false,
            message: `Failed to save : ${err.message}`,
          });
        else res.json({ success: true, message: `Successfully saved` });
      });
    }
  },
  authenticate: (req, res) => {
    User.findOne(
      {
        email: req.body.email,
      },
      function (err, user) {
        if (err) throw err;
        if (!user)
          res.status(403).send({
            success: false,
            message: "Authentication failed. User not found",
          });
        else
          user.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {
              let token = jwt.encode(user, process.env.SECRET_KEY);
              res.json({ success: true, token: token });
            } else return res.status(403).send({ success: false, message: "Authentication failed, wrong password" });
          });
      }
    );
  },
  getInfo: (req, res) => {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
      let token = req.headers.authorization.split(" ")[1];
      var decodedtoken = jwt.decode(token, process.env.SECRET_KEY);
      return res.json({
        success: true,
        message: `Token owner : ${decodedtoken.name}`,
      });
    } else {
      return res.json({ success: false, message: "No Headers" });
    }
  },
};

module.exports = functions;
