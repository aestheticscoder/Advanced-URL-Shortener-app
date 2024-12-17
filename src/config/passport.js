const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  const user = await User.findOne({ googleId: profile.id });
  if (user) return done(null, user);
  const newUser = new User({
    googleId: profile.id,
    name: profile.displayName,
    email: profile.emails[0].value
  });
  await newUser.save();
  return done(null, newUser);
}));
