const Sequelize = require('sequelize');

const database = new Sequelize(process.env.DATABASE_NAME,process.env.DATABASE_USERNAME,process.env.DATABASE_PASSWORD,{
	dialect: 'mysql',
	host: process.env.DATABASE_HOST
});

module.exports = database; 