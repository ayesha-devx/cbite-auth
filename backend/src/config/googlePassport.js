import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';

const configureGooglePassport = () => {
  const clientID = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const callbackURL = process.env.GOOGLE_CALLBACK_URL;

  if (!clientID || !clientSecret || !callbackURL) {
    throw new Error('Google OAuth configuration is missing in environment variables.');
  }

  passport.use(
    new GoogleStrategy(
      {
        clientID,
        clientSecret,
        callbackURL
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;
          const googleId = profile.id;
          const name = profile.displayName;

          // 1. Search for existing account linking via googleId
          let user = await User.findOne({ googleId });
          if (user) {
            return done(null, user);
          }

          // 2. Search for existing account linking via email
          if (email) {
            user = await User.findOne({ email });
            if (user) {
              user.googleId = googleId;
              user.isVerified = true;
              user.lastLoginAt = new Date();
              if (!user.authProviders.includes('google')) {
                user.authProviders.push('google');
              }
              await user.save();
              return done(null, user);
            }
          }

          // 3. Register new user profile
          user = new User({
            email,
            name,
            googleId,
            isVerified: true,
            authProviders: ['google'],
            lastLoginAt: new Date()
          });

          await user.save();
          done(null, user);
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
};

export default configureGooglePassport;
