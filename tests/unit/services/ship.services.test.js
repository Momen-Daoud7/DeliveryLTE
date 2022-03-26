const shipServices = require('../../../src/services/ship.services')
const mongoose = require('mongoose');
const User = require('../../../src/models/user');
const Ship = require('../../../src/models/ship');
const connect = require('../../../src/config/database')

// Connect to database
beforeAll(async () => {
	await connect();
})

let ship1,user;
beforeEach(async () => {
	await User.deleteMany({})
	await Ship.deleteMany({})

	user = new User(
		{
			name:"Momen Daoud Momen Daoud",
			email:"momen@mail.com",
			role:'manager',
			address:"khartoum",
			phone:'0126975878',
			password:'1234567'
		});

	await user.save();
	ship1 = new Ship(
		{
			id:1,
			type:'delivery',
			shipDate:'2020-02-12',
			incapsulationType:'coil',
			paymentType:'paid',
			receiverName: "Mohmmed",
			user:user._id,
			phone:'0127893830',
			address:'khartoum',
			orderNumber:112343,
			shipingCosts:2000,
			deliveryCosts:500,
			whoPay:'sender',
			receiveDate:'2020-02-17'
		}
	);

	await ship1.save();
})

describe('Ship services tests', () => {

	it("Should return all Ships",async () => {
		const ships = await shipServices.getShips();
		expect(ships).toEqual(expect.any(Array));
		expect(ships[0].type).toBe('delivery')
	})

	it("Should get data based on shipping status",async () => {
		const ships = await shipServices.getShipsBasedOnShippingStatus('new');
		expect(ships).toEqual(expect.any(Array));
		expect(ships[0].type).toBe('delivery')	
	})

	describe('test getShip functionallity', () => {

		it("Should get a single Ship", async () => {
			const ship = await shipServices.getShip(ship1._id);
			expect(ship.paymentType).toBe('paid')
		})

		it("Should return false when Ship is not exists", async () => {
			const Ship = await shipServices.getShip(282);
			expect(Ship).toBe(undefined)
		})
	})

	it("should create new Ship",async () => {
		const data = {
			type:'pick up',
			shipDate:'2020-02-12',
			incapsulationType:'coil',
			paymentType:'paid',
			receiverName: "Mohmmed",
			user:user._id,
			phone:'0127893830',
			address:'khartoum',
			orderNumber:112343,
			shipingCosts:2000,
			deliveryCosts:500,
			whoPay:'sender',
			receiveDate:'2020-02-17'
		}
		const ship = await shipServices.store(data)
		console.log("This ship" + ship)
		console.log(ship.user.name)
		expect(ship.type).toBe(data.type)
		expect(ship.userId).toBe(data.userId)
	})

	describe("Test update Ship functionallity",() => {

		it("Should update a Ship details",async () => {
			const data = {type: "pick up"}
			const ship = await shipServices.update(ship1._id,data)
			expect(ship.type).toBe(data.type)
		})

		it("Should return false when updateing unexiting Ship",async () => {
			const data = {type: "pick up"}
			const ship = await shipServices.update(11,data)
			expect(ship).toBe(undefined)
		})
	})


	describe("Test delete Ship functionallity",() => {

		it("Should delete a Ship",async () => {
			const ship = await shipServices.delete(ship1._id)
			expect(ship).toBe(true)
		})

		it("Should return false when updateing unexiting Ship",async () => {
			const ship = await shipServices.delete(100)
			expect(ship).toBe(undefined)
		})
	})

})