const Sequelize = require('sequelize');

const database = require('../config/database');

const User = require('./1-user')

const Ship = database.define('ships', {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true,
	},
	type: {
		type: Sequelize.ENUM('pick up','delivery'),
		allowNull: false,
	},
	shipDate: {
		type: Sequelize.DATE,
		allowNull:false
	},
	incapsulationType:{
		type:Sequelize.ENUM('coil','cartoon','documents'),
		allowNull:false
	},
	paymentType:{
		type:Sequelize.ENUM('paid','pay back'),
		allowNull:false
	},
	receiverName: {
		type: Sequelize.STRING,
		allowNull:false
	},
	phone: {
		type: Sequelize.INTEGER,
		allowNull:false
	},
	address: {
		type: Sequelize.STRING,
		allowNull:false
	},
	orderNumber: {
		type: Sequelize.INTEGER,
		allowNull:false
	},
	shipingCosts: {
		type: Sequelize.INTEGER,
		allowNull:false
	},
	deliveryCosts: {
		type: Sequelize.INTEGER,
		allowNull:false	
	},
	whoPay: {
		type:Sequelize.ENUM('sender','receiver'),
		allowNull:false	
	},
	receiveDate: {
		type:Sequelize.DATE
	},
	receiveTime: {
		type:Sequelize.TIME
	},
	receiveStatus: {
		type:Sequelize.ENUM('received','rejected'),
	},
	notes: {
		type: Sequelize.TEXT
	},
	shipingStatus: {
		type:Sequelize.ENUM('with captin','new','in stock','finshed','not supplyed yet'),	
		defaultValue:'new'
	}

});


// Relationships
User.hasMany(Ship,{foreignKey:'userId'})
User.hasMany(Ship,{foreignKey:'captinId'})


module.exports = Ship; 