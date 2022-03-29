const {body , validationResult} = require('express-validator');
const User = require('../models/1-user');


// login validation rules
exports.shipValidationRules = () => {
	return [
		body('type','type should be pick up or delivery').isIn(['pick up','delivery']),
		body('shipDate','please add a vaild date').isDate(),
		body('incapsulationType','incapsulation type should be cartoon or coil or documents').isIn(['coil','cartoon','document']),
		body('paymentType','payment type should be paid or pay back').isIn(['paid','pay back']),
		body("receiverName",'please add a vaild receiver name').isString().isLength({min:3}),
		body('phone','please add a vaild phone number').isInt(),
		body('address','please add a vaild address').isString().isLength({min:3}),
		body('orderNumber','please add a vaild order number').isInt(),
		body('shipingCosts','please add a vaild number').isInt(),
		body('deliveryCosts','please add a vaild number').isInt(),
		body('whoPay','the payment should be on the sender or the receiver').isIn(['sender','receiver'])
	];
};




// check if there're errors
exports.createValidate = (req,res,next) => {
	const errors = validationResult(req);
	if(errors.isEmpty()) {
		return next();
	}

	console.log(errors.array());
	return res.render('ships/create', {
		pageTitle: 'create ship',
		errors: errors.array(),
	});
}

exports.editValidate = (req,res,next) => {
	const errors = validationResult(req);
	if(errors.isEmpty()) {
		return next();
	}

	console.log(errors.array());
	return res.render('ships/edit', {
		pageTitle: 'Edit ship',
		errors: errors.array(),
	});
}