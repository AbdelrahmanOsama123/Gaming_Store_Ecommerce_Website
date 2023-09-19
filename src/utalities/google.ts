import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from'dotenv';
import { signUp } from '../conroller/users';
import { signIn } from '../conroller/users';
import { User } from '../types/users';

dotenv.config();

passport.use(
    'google-signup',
    new GoogleStrategy(
      {
        clientID: (process.env.GOOGLE_CLIENT_ID_SIGNUP) as string,
        clientSecret: (process.env.GOOGLE_CLIENT_SECRET_SIGNUP) as string,
        callbackURL: 'http://localhost:8000/auth/google/signup/callback', // Adjust this to your callback URL for sign-up
      },
      async(accessToken, refreshToken, profile:any, done) => {
        const firstname = profile.name?.givenName;
        const lastname = profile.name?.familyName;
        const email = (profile.emails[0].value);
        const username = email.split('@')[0];
        const password = username+profile.id ;
        const confirm_password = username+profile.id ;
        const user : User = {
            email,
            username,
            firstname,
            lastname,
            password,
            confirm_password,
        }
        const response = await signUp(user);
       
        if(response != null){
            return done(null, profile,{message:'hello',username});
        }
        else{
            return done(null, profile,{message:"error"});
        }
      }
    )
  );
  
  passport.use(
    'google-signin',
    new GoogleStrategy(
      {
        clientID: (process.env.GOOGLE_CLIENT_ID_SIGNIN) as string,
        clientSecret: (process.env.GOOGLE_CLIENT_SECRET_SIGNIN) as string,
        callbackURL: 'http://localhost:8000/auth/google/signin/callback', // Adjust this to your callback URL for sign-in
      },
      async(accessToken, refreshToken, profile:any, done) => {
        const email = (profile.emails[0].value);
        const username = email.split('@')[0];
        const password = username+profile.id ;

        const User = await signIn(username,password);
        console.log(User);
        if(User != null){
            return done(null, profile,{message:'hello',username});
        }
        else{
            return done(null, profile,{message:'error'});
        }
      }
    )
  );
  
  // Serialize and deserialize user (this code can be common for both sign-up and sign-in)
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user:any, done) => {
    done(null, user);
  });
  