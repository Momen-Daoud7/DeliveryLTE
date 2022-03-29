const Ship = require('../models/ship');

module.exports = class ShipServices {
	// get all Ships
	static async getShips() {
		try{
			const ships = await Ship.find({});
			return ships;
		}catch(error) {
			console.log(error);
		}
	}


	// get client's ships
	static async getClientShips(clientId) {
		try {
			const ships = await Ship.find({client:clientId}).populate('client');
			return ships
		}catch(error) {
			console.log(error)
		}
	}

	// Get ship data based on shiping status
	static async getShipsBasedOnShippingStatus(shippingStatus) {
		try {
			const ships = await Ship.find({shipingStatus:shippingStatus});
			return ships
		}catch(error) {
			console.log(error)
		}
	}

	// Get ship data based on shiping status
	static async getShipsBasedOnReceiveStatus(receiveStatus) {
		try {
			const ships = await Ship.find({receiveStatus:receiveStatus});
			return ships
		}catch(error) {
			console.log(error)
		}
	}

	//store a Ship
	static async store(data) {
		try{
			const ship = await Ship.create(data);
			return ship ? ship : false;
		}catch(error) {
			console.log(error);
		}
	}

	// update a Ship
	static async update(ShipId,data) {
		try{
			const oldShip = await Ship.findById(ShipId)
			if(!oldShip) {
				return  false;
			}
			const updatedShip = await Ship.findByIdAndUpdate(ShipId,data,{
				new:true,
				runValidators:true
			});
			return updatedShip;
			
		}catch(error) {
			console.log(error);
		}
	}

	// delete a Ship
	static async delete(ShipId) {
		try{
			const ship = await Ship.findById(ShipId);
			if(!ship) {
				return false;
			}
			await ship.remove();
			return true;
		}catch(error){
			console.log(error);
		}
	}

	// get a single Ship
	static async getShip(ShipId) {
		try{
			const ship = await Ship.findById(ShipId);
			return ship ? ship : false;
		}catch(error) {
			console.log(error);
		}
	}

	// Change ship status
	static async changeShipStatus(shipId,status) {
		try {
			const ship = await this.getShip(shipId)
			if(!ship) {
				return false
			}
			await Ship.findByIdAndupdate(shipId,{shipingStatus:status})
			return ship;
		}catch(error) {
			console.log(error)
		}
	}

	
}