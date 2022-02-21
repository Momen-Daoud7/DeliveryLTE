const User = require('../models/1-user');

module.exports = class userServices {
	// get all users
	static async getUsers() {
		try{
			const users = await User.findAll();
			return users;
		}catch(error) {
			console.log(error);
		}
	}

	static async getUserByRole(role) {
		try {
			const users = await User.findAll({where:{role}});
			return users
		}catch(error) {
			console.log(error)
		}
	}

	//store a user
	static async store(data) {
		try{
			const user = await User.create(data);
			return user ? user : false;
		}catch(error) {
			console.log(error);
		}
	}

	// update a user
	static async update(userId,data) {
		try{
			const oldUser = await User.findByPk(userId)
			if(!oldUser) {
				return  false;
			}
			const updatedUser = await oldUser.update({
					name: data.name,
					email: data.email,
					password: data.password || oldUser.password,
					role: data.role || oldUser.role
				});
			console.log(updatedUser)
				return updatedUser;
			
		}catch(error) {
			console.log(error);
		}
	}

	// delete a user
	static async delete(userId) {
		try{
			const user = await User.findByPk(userId);
			if(!user) {
				return false;
			}
			const deleted = await user.destroy();
			return true;
		}catch(error){
			console.log(error);
		}
	}

	// get a single user
	static async getUser(userId) {
		try{
			const user = await User.findByPk(userId);
			if(!user) {
				console.log('no user with that id');
				return false;
			}
			return user;
		}catch(error) {
			console.log(error);
		}
	}

	
}