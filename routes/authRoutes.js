const express = require('express');
const {userSignUpValidator} = require('../middlewares/userValidator');

const {Hello, signUp, signIn, signOut} = require('../controllers/authController');
const { requireSignIn, requireAuth, isAdmin } = require('../middlewares/auth');

const router = express.Router();


router.get('/', Hello)

router.post('/sign-up',userSignUpValidator,signUp)

router.post('/sign-in',signIn)

router.get('/sign-out',signOut)

router.get('/testAuth',requireSignIn,requireAuth,isAdmin, (req,res) => {
    res.send('Test')
})


module.exports = router