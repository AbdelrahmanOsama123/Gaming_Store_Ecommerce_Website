import express from 'express';
import passport from 'passport';

const google_route=  express();

google_route.get('/auth/google/signup', passport.authenticate('google-signup', { scope: ['profile', 'email'] }));

google_route.get(
  '/auth/google/signup/callback',
  passport.authenticate('google-signup'),
  (req:express.Request, res:express.Response) => {
    try{
      const responseMessage:any = req.authInfo;
      if(responseMessage.message=='hello'){
        res.cookie('username',responseMessage.username);
        res.redirect('/home');
      }
  
      else
        res.redirect('/register');
    }
    catch(err){
        res.status(400).send('error while signing up user')
    }
  }
);

google_route.get('/auth/google/signin', passport.authenticate('google-signin', { scope: ['profile', 'email'] }));

google_route.get('/auth/google/signin/callback',passport.authenticate('google-signin'),(req, res) => {
      const responseMessage:any = req.authInfo;
      if(responseMessage.message=='hello'){
        res.cookie('username', responseMessage.username);
        res.redirect('/home');
      }
  
      else
        res.redirect('/login');
  }
);

export default google_route;