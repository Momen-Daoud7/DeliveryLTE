const User = require('../models/user');

module.exports = class userServices {
	// get all users
	static async getUsers() {
		try{
			const users = await User.find({});
			return users;
		}catch(error) {
			console.log(error);
		}
	}

	static async getUserByRole(role) {
		try {
			const users = await User.find({role});
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
			const oldUser = await User.findById(userId)
			if(!oldUser) {
				return  false;
			}
			const updatedUser = await User.findByIdAndUpdate(userId,data,{
				 new: true,
    			runValidators: true
			});
			return updatedUser;
			
		}catch(error) {
			console.log(error);
		}
	}

	// delete a user
	static async delete(userId) {
		try{
			const user = await User.findById(userId);
			if(!user) {
				return false;
			}
			const deleted = await user.remove();
			return true;
		}catch(error){
			console.log(error);
		}
	}

	// get a single user
	static async getUser(userId) {
		try{
			const user = await User.findById(userId);
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