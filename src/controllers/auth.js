const bcrypt = require('bcryptjs');
const userServices = require('../services/user.services');
const User = require('../models/1-user');

// Get login page
exports.getLogin = async (req,res,next) => {
	try {		
		res.render('auth/login',{
			pageTitle:'login',
			errors:''
		})
	}catch(err) {
		console.log(err)
	}
}

// Login user
exports.postLogin = async (req,res,next) => {
	try {

		const user = await User.findOne({where:{email:req.body.email}});
		if(!user) {
			return res.render('auth/login',{
				pageTitle:'login',
				errors:['Invalid email']
			})
		}

		// Check for the password
		const matchedPassword = await user.matchPassword(req.body.password);

		if(!matchedPassword) {
			console.log(matchedPassword)
			return res.redirect('/login')
		}

		//redirect to the user profile after save him in the session
		console.log(req.session)
		req.session.user = user;
		res.redirect('/ships');

	}catch(err) {
		console.log(err)
	}
}

exports.logout = async (req,res) => {
	try {
		const loggedOut = await req.session.destroy();
		return res.redirect('/login');
	}
	catch(error) {
		console.log(error);
	}
}