const userServices = require('../../../src/services/user.services')
const mongoose = require('mongoose');
const User = require('../../../src/models/user')
const connectDB = require('../../../src/config/database')

// Connect to database
beforeAll(async () => {
	await connectDB();
})

let user1;
beforeEach(async () => {
	await User.deleteMany();
	user1 = new User({
		name:"Momen Daoud Momen Daoud",
		email:"momen@mail.com",
		role:'manager',
		address:"khartoum",
		phone:'0126975878',
		password:'1234567'
	})

	const user2 = new User({
		name:"Ahmed Daoud Momen Daoud",
		email:"ahmed@mail.com",
		role:'client',
		address:"khartoum",
		phone:'0136975878',
		useStatus:false,
		password:'1234567'
	})

	await user1.save();
	await user2.save()
})

describe('User services tests', () => {

	it("Should return all users",async () => {
		const users = await userServices.getUsers();
		expect(users).toEqual(expect.any(Array));
		expect(users[0].name).toBe('Momen Daoud Momen Daoud')
		expect(users[1].name).toBe('Ahmed Daoud Momen Daoud')
	})

	it("Should fetch all the users by thier roles",async () => {
		const clients = await userServices.getUserByRole('client');
		expect(clients[0].name).toBe('Ahmed Daoud Momen Daoud')
	})

	describe('test getUser functionallity', () => {

		it("Should get a single user", async () => {
			const user = await userServices.getUser(user1._id);
			expect(user.name).toBe('Momen Daoud Momen Daoud')
		})

		it("Should return false when user is not exists", async () => {
			const user = await userServices.getUser(5);
			expect(user).toBe(undefined)
		})
	})

	it("should create new user",async () => {
		const data = {
			name:"John Do",
			email:"momen12@mail.com",
			role:'manager',
			address:"khartoum",
			phone:'0126975878',
			password:'1234567'
		}
		const user = await userServices.store(data)
		console.log(user)
		expect(user.name).toBe(data.name)
		expect(user.phone).toBe(126975878)
		expect(user.useStatus).toBe(false)
	})

	describe("Test update user functionallity",() => {

		it("Should update a user details",async () => {
			const data = {name: "John Do"}
			const user = await userServices.update(user1._id,data)
			expect(user.name).toBe(data.name)
		})

		it("Should return false when updateing unexiting user",async () => {
			const data = {name: "John Do"}
			const user = await userServices.update(1,data)
			expect(user).toBe(undefined)
		})
	})


	describe("Test delete user functionallity",() => {

		it("Should delete a user",async () => {
			const user = await userServices.delete(user1._id)
			expect(user).toBe(true)
		})

		it("Should return false when updateing unexiting user",async () => {
			const user = await userServices.delete(100)
			expect(user).toBe(undefined)
		})
	})

})