const {body , validationResult} = require('express-validator');
const User = require('../models/user');


// login validation rules
exports.loginValidationRules = () => {
	return [
		body('email',"please add a valid email").isEmail(),
		body('email',"email not found").custom(async (value,{req}) => {
			//check if the email is already exist
			const user =  await User.findOne({where:{email:req.body.email}});			
			if(user) {
				return true;
			}
			return Promise.reject("email not found");
		}),
		body('password','password should be at leaest 8 charactor').trim().isLength({min: 6}),
	];
};


// regsiter validation rules
exports.registerValidationRules = () => {
	return [
		body('name',"please add a valid name").isLength({min:3}),
		body('email',"please add a valid email").isEmail(),
		body('password','password should be at leaest 8 charactor').trim().isLength({min: 6}),
		body('passwordConfirm','password don not match').custom(async(value,{req}) => {
			if(value === req.body.password) {
				return true
			}
			return Promise.reject('password do not match')
		})
	];
};

// check if there're errors
exports.loginValidate = (req,res,next) => {
	const errors = validationResult(req);
	if(errors.isEmpty()) {
		return next();
	}

	console.log(errors.array());
	return res.render('auth/login', {
		pageTitle: 'login',
		errors: errors.array(),
	});
}

exports.registerValidate = (req,res,next) => {
	const errors = validationResult(req);
	if(errors.isEmpty()) {
		return next();
	}

	console.log(errors.array());
	return res.render('auth/register', {
		pageTitle: 'register',
		errors: errors.array(),
	});
}
