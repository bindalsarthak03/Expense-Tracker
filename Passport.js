const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config()
passport.use(new GoogleStrategy({
  clientID: process.env.Client_Id,
  clientSecret: process.env.Client_Secret,
  callbackURL: "/api/v1/get-incomes"
},
(accessToken, refreshToken, profile, done) => {
  // This function will be called when the user is authenticated
  // You can save the user's profile information to your database or session
  return done(null, profile);
}));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
