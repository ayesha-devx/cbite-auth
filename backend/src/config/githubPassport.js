import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import crypto from 'crypto';
import User from '../models/User.js';

// Custom cookie-based state store for stateless OAuth CSRF protection
const cookieStateStore = {
  store: (req, cb) => {
    try {
      const state = crypto.randomBytes(16).toString('hex');
      // Store in secure HTTP-only cookie valid for 10 minutes
      req.res.cookie('oauth_state', state, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 10 * 60 * 1000, // 10 minutes
        path: '/'
      });
      cb(null, state);
    } catch (err) {
      cb(err);
    }
  },
  verify: (req, state, cb) => {
    try {
      const storedState = req.cookies?.oauth_state;
      // Clear cookie immediately after check (prevent replay attacks)
      req.res.clearCookie('oauth_state', {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/'
      });

      if (!storedState || storedState !== state) {
        return cb(null, false, { message: 'Invalid OAuth state token. Possible CSRF attack detected.' });
      }
      cb(null, true);
    } catch (err) {
      cb(err, false);
    }
  }
};

const configureGitHubPassport = () => {
  const clientID = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  const callbackURL = process.env.GITHUB_CALLBACK_URL;

  if (!clientID || !clientSecret || !callbackURL) {
    throw new Error('GitHub OAuth configuration is missing in environment variables.');
  }

  passport.use(
    new GitHubStrategy(
      {
        clientID,
        clientSecret,
        callbackURL,
        scope: ['user:email'],
        state: true, // Enable state protection
        store: cookieStateStore // Use custom cookie-based CSRF protection store
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const githubId = profile.id;
          const name = profile.displayName || profile.username;
          const githubUsername = profile.username;

          // Safely search for primary/public email addresses
          let email = profile.emails?.[0]?.value;

          // 1. Search for existing account linking via githubId
          let user = await User.findOne({ githubId });
          if (user) {
            return done(null, user);
          }

          // 2. Search for existing account linking via email
          if (email) {
            user = await User.findOne({ email });
            if (user) {
              user.githubId = githubId;
              user.githubUsername = githubUsername;
              user.isVerified = true;
              user.lastLoginAt = new Date();
              if (!user.authProviders.includes('github')) {
                user.authProviders.push('github');
              }
              await user.save();
              return done(null, user);
            }
          }

          // 3. Register new user profile (email may be private/absent)
          const userData = {
            name,
            githubId,
            githubUsername,
            isVerified: true,
            authProviders: ['github'],
            lastLoginAt: new Date()
          };

          if (email) {
            userData.email = email;
          }

          user = new User(userData);
          await user.save();
          done(null, user);
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
};

export default configureGitHubPassport;
