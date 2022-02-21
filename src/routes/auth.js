const express = require('express');
const  {
	getLogin,
	logout,
	postLogin,
} = require('../controllers/auth');

// Middlewares
const { protect , canNotLogin} = require('../middleware/auth');

// Validation
const {
	loginValidationRules,
	loginValidate,
} = require('../validation/auth');

const router = express.Router();

router.get('/login',canNotLogin ,getLogin);
router.post('/login',canNotLogin,loginValidationRules(),loginValidate,postLogin);
router.post('/logout',logout);

module.exports = router