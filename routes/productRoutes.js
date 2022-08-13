const express = require('express');
const { createProduct, showProduct, relatedProduct, productById, removeProduct, updateProduct, allProducts, searchProduct, getProductPhoto } = require('../controllers/productController');
const { requireSignIn, requireAuth, isAdmin } = require('../middlewares/auth');
const {userById} = require('../middlewares/user')

const router = express.Router();



// Get Params
router.param('productId', productById)
router.param('userId', userById)

router.get('/product/:productId',showProduct)

router.get('/product/related/:productId', relatedProduct)

router.get('/product/photo/:productId', getProductPhoto)

router.post('/product/search', searchProduct)

router.get('/product/', allProducts)

router.put('/product/:productId/:userId',requireSignIn, requireAuth, isAdmin,updateProduct )

router.post('/product/create/:userId',requireSignIn, requireAuth, isAdmin,createProduct )

router.delete('/product/:productId/:userId', requireSignIn, requireAuth, isAdmin, removeProduct)




module.exports = router