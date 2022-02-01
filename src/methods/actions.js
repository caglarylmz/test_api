var User = require("../models/user");
var jwt = require("jwt-simple");
var config = require("../config/dbconfig");

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
        name: req.body.name,
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
              let token = jwt.encode(user, config.secret);
              res.json({ success: true, token: token });
            } else return res.status(403).send({ success: false, message: "Authentication failed, wrong password" });
          });
      }
    );
  },
};

module.exports = functions;
