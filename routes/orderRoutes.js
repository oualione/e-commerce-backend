const express = require('express');
const { createOrder } = require('../controllers/orderController');
const { requireSignIn, requireAuth } = require('../middlewares/auth');
const {userById} = require('../middlewares/user');

const router = express.Router();





router.post('/order/create/:userId',requireSignIn, requireAuth , createOrder )
router.param('userId', userById)








module.exports = router