const express = require('express');
const { createCategory, categoryById, showCategory, removeCategogy, allCategories } = require('../controllers/categoryController');
const { requireSignIn, requireAuth, isAdmin } = require('../middlewares/auth');
const {userById} = require('../middlewares/user');

const router = express.Router();





router.post('/category/create/:userId',requireSignIn, requireAuth, isAdmin ,createCategory )
router.param('userId', userById)

router.get('/category', allCategories)


router.get('/category/:categoryId', showCategory)
router.param('categoryId', categoryById)

router.delete('/category/:categoryId/:userId', [requireSignIn, requireAuth, isAdmin] ,removeCategogy)






module.exports = router