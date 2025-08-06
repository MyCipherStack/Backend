import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { env } from '@/config/env'; 

passport.use(new GoogleStrategy({
  clientID: env.GOOGLE_CLIENT_ID,
  clientSecret: env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/api/user/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  console.log('stategy working');

  // This is where you'd check if the user exists, create them, etc.
  const user = {
    googleid: profile.id,
    name: profile.displayName,
    email: profile.emails?.[0].value || '',
    image: profile.photos?.[0]?.value,
    id: profile.id,
    role: 'regular',

  };
  console.log('strategy', user);

  return done(null, user); // success
}));

// not need this methord iam using jwt

// passport.serializeUser((user, done) => {
//   done(null, user);
// });

// passport.deserializeUser((user:unknown, done) => {
//   done(null, user);
// });
