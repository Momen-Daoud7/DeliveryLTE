const shipServices = require('../../../src/services/ship.services')
const User = require('../../../src/models/1-user');
const Ship = require('../../../src/models/2-ship');
const database = require('../../../src/config/database')

// Connect to database
beforeAll(async () => {
	await database.sync()
})


beforeEach(async () => {
	await User.destroy({where:{}})
	await Ship.destroy({where:{}})

	await User.bulkCreate([
		{
			id:1,
			name:"Momen Daoud Momen Daoud",
			email:"momen@mail.com",
			role:'manager',
			address:"khartoum",
			phone:'0126975878',
			password:'1234567'
		},
		{
			id:2,
			name:"Ahmed Daoud Momen Daoud",
			email:"ahmed@mail.com",
			role:'captin',
			address:"khartoum",
			phone:'0136975878',
			useStatus:false,
			password:'1234567'
		}

	])

	await Ship.bulkCreate([
		{
			id:1,
			type:'delivery',
			shipDate:'2020-02-12',
			incapsulationType:'coil',
			paymentType:'paid',
			receiverName: "Mohmmed",
			userId:1,
			phone:'0127893830',
			address:'khartoum',
			orderNumber:112343,
			shipingCosts:2000,
			deliveryCosts:500,
			whoPay:'sender',
			receiveDate:'2020-02-17'
		}
	])
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
			const ship = await shipServices.getShip(1);
			expect(ship.paymentType).toBe('paid')
		})

		it("Should return false when Ship is not exists", async () => {
			const Ship = await shipServices.getShip(282);
			expect(Ship).toBe(false)
		})
	})

	it("should create new Ship",async () => {
		const data = {
			id:3,
			type:'pick up',
			shipDate:'2020-02-12',
			incapsulationType:'coil',
			paymentType:'paid',
			receiverName: "Mohmmed",
			userId:1,
			phone:'0127893830',
			address:'khartoum',
			orderNumber:112343,
			shipingCosts:2000,
			deliveryCosts:500,
			whoPay:'sender',
			receiveDate:'2020-02-17'
		}
		const ship = await shipServices.store(data)
		console.log(ship)
		expect(ship.type).toBe(data.type)
		expect(ship.userId).toBe(data.userId)
	})

	describe("Test update Ship functionallity",() => {

		it("Should update a Ship details",async () => {
			const data = {type: "pick up"}
			const ship = await shipServices.update(1,data)
			expect(ship.type).toBe(data.type)
		})

		it("Should return false when updateing unexiting Ship",async () => {
			const data = {type: "pick up"}
			const ship = await shipServices.update(11,data)
			expect(ship).toBe(false)
		})
	})


	describe("Test delete Ship functionallity",() => {

		it("Should delete a Ship",async () => {
			const ship = await shipServices.delete(1)
			expect(ship).toBe(true)
		})

		it("Should return false when updateing unexiting Ship",async () => {
			const ship = await shipServices.delete(100)
			expect(ship).toBe(false)
		})
	})

})