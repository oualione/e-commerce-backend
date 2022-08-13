const express = require('express');
const { generateBraintreeToken, processPayment } = require('../controllers/braintreeController');
const { requireSignIn, requireAuth, isAdmin } = require('../middlewares/auth');
const {userById} = require('../middlewares/user')


const router = express.Router();

router.get('/braintree/getToken/:userId',[requireSignIn,requireAuth], generateBraintreeToken)
router.post('/braintree/purchase/:userId',[requireSignIn,requireAuth], processPayment)

router.param('userId', userById)





module.exports = router;