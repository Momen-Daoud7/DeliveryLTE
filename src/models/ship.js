const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShipSchema = new Schema({
	type: {
		type:String,
		enum:['pick up','delivery'],
		required:[true,'Type is required.']
	},
	shipDate: {
		type:Date,
		required:[true,"Ship date is required."]
	},
	incapsulationType:{
		type:String,
		enum:['coil','cartoon','documents'],
		required:[true,"incapsulationType is required."]
	},
	paymentType:{
		type:String,
		enum:['paid','pay back'],
		required:[true,"Payment type is required."]	
	},
	receiverName: {
		type: String,
		required:[true,'Receiver name is required']
	},
	phone: {
		type: Number,
		required:[true,"Phone is required"]
	},
	address: {
		type: String,
		required:[true,'Address is required']	
	},
	orderNumber: {
		type: Number,
		required:[true,'Order number is required']
	},
	shipingCosts: {
		type: Number,
		required:[true,"Shipping cost is required."]
	},
	deliveryCosts: {
		type: Number,
		required:[true,"Delivery consts is required"]
	},
	whoPay: {
		type:String,
		enum:['receiver','sender'],
		required:[true,'whoPay is required.']	
	},
	receiveDate: {
		type:Date
	},
	receiveTime: {
		type: String
	},
	receiveStatus: {
		type:String,
		enum:['received','rejected']
	},
	notes: {
		type: String
	},
	shipingStatus: {
		type:String,
		enum:['with captin','new','in stock','finshed','not supplyed yet'],
		default:"new"
	},
	user: {
		type: Schema..Types.ObjectId,
		ref:"User",
		required:true
	},
	captin: {
		type: Schema..Types.ObjectId,
		ref:'User'
	}

})

const Ship = mongoose.model('ship',ShipSchema);

module.exports = Ship;