

// const passport = require('passport');
// const { UserModel } = require('./Models/user.model');



// module.exports = passport



//userRouter //

// const express = require(`express`)
// const { UserModel } = require("../Models/user.model")
// const passport = require('passport')
// const UserRouter = express.Router()
// const session = require('express-session')
// require('dotenv').config()


// UserRouter.use(session({
//     secret: 'secretcode',
//     resave: true,
//     saveUninitialized: true
// }))

// UserRouter.use(passport.initialize())
// UserRouter.use(passport.session())


// passport.serializeUser((user, cb) => {
//     console.log(user , '21')
//     return cb(null, user)
//   })
//   passport.deserializeUser((user, cb) => {
//     console.log(user , '25')
//     return cb(null, user)
//   })
  

// var GoogleStrategy = require('passport-google-oauth20').Strategy;
// console.log(process.env.GOOGLE_CLIENT_ID)
// passport.use(new GoogleStrategy({
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: "/users/auth/google/callback",
// },

//   async function (accessToken, refreshToken, profile, cb) {
//     let email = profile._json.email
//     const exist = await UserModel.findOne({ email })
//     if (exist) {
//       return cb(null, exist, 'user already exist')
//     } else {
//       let user = new UserModel(profile._json)
//       await user.save()
//       console.log(user)
//       return cb(null, user, 'user created')
//     }
//   }
// ));


// UserRouter.get('/auth/google',
//     passport.authenticate('google', { scope: ['profile', 'email'] }));

// UserRouter.get('/auth/google/callback',
//     passport.authenticate('google', { failureRedirect: '/login' }),
    
//     function (req,res){
//  res.redirect('http://localhost:3000')
//     });

//     UserRouter.get('/getuser', (req, res) => {
//         if (!req.user) {
//             res.status(401).send('Unauthorized');
//         } else {
//             console.log(req.user, '39')
//             res.send(req.user);
//         }
//     });
    


// module.exports = {
//     UserRouter
// }