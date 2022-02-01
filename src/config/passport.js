var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;

var User = require("../models/user");
var config = require("../config/dbconfig");

module.exports = (passport) => {
  var opts = {};

  opts.secretOrKey = config.secret;
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
