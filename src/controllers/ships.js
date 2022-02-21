const shipServices = require('../services/ship.services');
const userServices = require('../services/user.services');
const Ship = require('../models/2-ship')

// Get all ships
exports.getShips = async(req,res,next) => {
	try {
		const ships = await shipServices.getShips();
		res.render('ships/index', {
			pageTitle: 'Ships',
			ships
		})
	}catch(error) {
		console.log(error)
	}
}

// Get single ship
exports.getShip = async(req,res,next) => {
	try {
		const ship = await shipServices.getShip(req.params.shipId);
		res.render('ships/index', {
			pageTitle: 'Ship',
			ship
		})
	}catch(error) {
		console.log(error)
	}
}

// get ships with new shipping status
exports.newShips = async (req,res,next) => {
	try {
		const ships = await shipServices.getShipsBasedOnShippingStatus('new');
		res.render('ships/newShips', {
			pageTitle:'New ships',
			ships
		})
	}catch(error) {
		console.log(error)
	}
}


// get ships with withCaptin shipping status
exports.withCaptinShips = async (req,res,next) => {
	try {
		const ships = await shipServices.getShipsBasedOnShippingStatus('with captin');
		res.render('ships/withCaptinShips', {
			pageTitle:'With captin ships',
			ships
		})
	}catch(error) {
		console.log(error)
	}
}

// get ships with in stock shipping status
exports.inStockShips = async (req,res,next) => {
	try {
		const ships = await shipServices.getShipsBasedOnShippingStatus('in stock');
		res.render('ships/inStockShips', {
			pageTitle:'New ships',
			ships
		})
	}catch(error) {
		console.log(error)
	}
}

// get ships with new shipping status
exports.finshedShips = async (req,res,next) => {
	try {
		const ships = await shipServices.getShipsBasedOnShippingStatus('finshed');
		res.render('ships/finshedShips', {
			pageTitle:'New ships',
			ships
		})
	}catch(error) {
		console.log(error)
	}
}

// get ships with new shipping status
exports.notSuppledShips = async (req,res,next) => {
	try {
		const ships = await shipServices.getShipsBasedOnShippingStatus('not supplyed yet');
		res.render('ships/notSuppledShips', {
			pageTitle:'Not suppled ships',
			ships
		})
	}catch(error) {
		console.log(error)
	}
}


exports.rejectedShips = async (req,res,next) => {
	try {
		const ships = await shipServices.getShipsBasedOnReceiveStatus('rejected');
		res.render('ships/rejectedShips', {
			pageTitle:'Rejected ships',
			ships
		})
	}catch(error) {
		console.log(error)
	}
}


exports.receivedShips = async (req,res,next) => {
	try {
		const ships = await shipServices.getShipsBasedOnReceiveStatus('received');
		res.render('ships/receivedShips', {
			pageTitle:'received ships',
			ships
		})
	}catch(error) {
		console.log(error)
	}
}

// Create Page
exports.createPage = async(req,res,next) => {
	try {
		const users = await userServices.getUsers()
		res.render('ships/create', {
			pageTitle: 'Create ship',
			errors:undefined,
			users
		})
	}catch(error) {
		console.log(error)
	}
}

// Receive Page
exports.receivePage = async(req,res,next) => {
	try {
		const ship = await shipServices.getShip(req.params.shipId);
		res.render('ships/receiveShip', {
			pageTitle: 'Create ship',
			errors:undefined,
			ship
		})
	}catch(error) {
		console.log(error)
	}
}

// Edit Page
exports.editPage = async(req,res,next) => {
	try {
		const ship = await shipServices.getShip(req.params.shipId);
		const users = await userServices.getUsers()
		res.render('ships/edit', {
			pageTitle: 'Edit ship',
			errors:undefined,
			ship,
			users
		})
	}catch(error) {
		console.log(error)
	}
}

// hire Captin Page
exports.hireCaptinPage = async(req,res,next) => {
	try {
		const ship = await shipServices.getShip(req.params.shipId);
		if(!ship) {
			res.redirect('/')
		}
		const captins = await userServices.getUserByRole('captin')
		res.render('ships/hireCaptin', {
			pageTitle: 'Edit ship',
			errors:undefined,
			ship,
			captins
		})

	}catch(error) {
		console.log(error)
	}
}

// Receive from captin Page
exports.receiveFromCaptinPage = async(req,res,next) => {
	try {
		const ship = await shipServices.getShip(req.params.shipId);
		if(!ship) {
			res.redirect('/')
		}
		res.render('ships/shipReceived', {
			pageTitle: 'Edit ship',
			errors:undefined,
			ship,
		})

	}catch(error) {
		console.log(error)
	}
}


// with captin page
exports.withCaptinPage = async (req,res,next) => {
	try {
		const ships = await Ship.findAll({where:{captinId:req.session.user.id,shipingStatus:'with captin'}});
		res.render('ships/withCaptinShips',{
			pageTitle: "With captin ships",
			ships
		})
	}catch(error) {
		console.log(error)
	}
}

// with captin page
exports.notSupplyedPage = async (req,res,next) => {
	try {
		const ships = await Ship.findAll({where:{captinId:req.session.user.id,shipingStatus:'not supplyed yet'}});
		res.render('ships/notSuppledShips',{
			pageTitle: "With captin ships",
			ships
		})
	}catch(error) {
		console.log(error)
	}
}

// with captin page
exports.finshedPage = async (req,res,next) => {
	try {
		const ships = await Ship.findAll({where:{captinId:req.session.user.id,shipingStatus:'finshed'}});
		res.render('ships/finshedShips',{
			pageTitle: "With captin ships",
			ships
		})
	}catch(error) {
		console.log(error)
	}
}

// Add a new ship
exports.createShip = async(req,res,next) => {
	try {
		await shipServices.store(req.body);
		res.redirect('/ships')
	}catch(error) {
		console.log(error)
	}
}

// update ship
exports.updateShip = async(req,res,next) => {
	try {

		const ship = await shipServices.update(req.params.shipId,req.body);
		res.redirect('/ships')
	}catch(error) {
		console.log(error)
	}
}

// Delete a ship
exports.deleteShip = async(req,res,next) => {
	try {
		await shipServices.delete(req.params.shipId);
		res.redirect('/ships')
	}catch(error) {
		console.log(error)
	}
}

// Receive a ship
exports.receiveShip = async(req,res,next) => {
	try {
		req.body.shipingStatus = 'in stock'
		const ship = await shipServices.update(req.params.shipId,req.body);
		res.redirect('/ships')
	}catch(error) {
		console.log(error)
	}
}

// Hire a captin
exports.hireCaptin = async(req,res,next) => {
	try {
		req.body.shipingStatus = 'with captin'
		const ship = await shipServices.update(req.params.shipId,req.body);
		res.redirect('/ships')
	}catch(error) {
		console.log(error)
	}
}


// Recived shpis from catpin
exports.receiveFromCaptin = async(req,res,next) => {
	try {
		req.body.shipingStatus = 'not supplyed yet'
		const ship = await shipServices.update(req.params.shipId,req.body);
		res.redirect('/ships')
	}catch(error) {
		console.log(error)
	}
}

// supply ship
exports.supplyShip = async(req,res,next) => {
	try {
		req.body.shipingStatus = 'finshed'
		const ship = await shipServices.update(req.params.shipId,req.body);
		res.redirect('/ships')
	}catch(error) {
		console.log(error)
	}
}