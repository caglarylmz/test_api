var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
require("dotenv").config();
var dbconfig = require("./dbconfig");
var User = require("../models/user");

module.exports = (passport) => {
  var opts = {};
  console.log(dbconfig.secret);
  console.log(process.env.SECRET_KEY);
  opts.secretOrKey = process.env.SECRET_KEY;
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      User.findOne(
        {
          id: jwt_payload.id,
        },
        function (err, user) {
          if (err) return done(err, false);
          if (user) return done(null, user);
          else return done(null, false);
        }
      );
    })
  );
};
