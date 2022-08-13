const User = require('../models/user')

const jwt = require('jsonwebtoken')

exports.Hello = (req,res) => {
    res.send('Hello World ! This is user Controller !')
}


exports.signUp = (req, res) => {
   
    const user = new User(req.body);

    user.save((err, user) => {
       if(err) {
           return res.status(400).send(err)
       }

       user.hashed_password = undefined;
       user.salt = undefined;
       res.send(user)
    })
}

exports.signIn = (req, res) => {

   const { email, password } = req.body;

   User.findOne({email}, (err, user) => {
       
       if(err || !user) {
           return res.status(400).json({
               error: 'USER NOT FOUND ! PLEASE SIGN UP NOW'
           })
       }

       if(!user.authenticate(password)) {
           return res.status(401).json({
               error: 'WRONG EMAIL OR PASSWORD !'
           })
       }

       const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRET);

       res.cookie('token', token, {expire: new Date() + 8062000})

       const { _id, name, email, role } = user;

       return res.json({
           token, user: {_id, name, email, role}
       })

   })

}

exports.signOut = (req, res) => {

   res.clearCookie('token');

   res.json({
       message: "User Signout"
   })

}