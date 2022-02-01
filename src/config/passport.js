var JwtStrategy = require("passport-jwt");
var ExtractJwt = require("passport-jwt");

var User = require("../models/user");
var config = require("../config/dbconfig");

module.exports = (passport) => {
  var opts = {};

  opts.secretKey = config.secret;
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  passport.use(
    new JwtStrategy(opts, function (jwt_payload) {
      User.find(
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
