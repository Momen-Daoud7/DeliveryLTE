const express = require('express');
const  {
	getShips,
	getShip,
	newShips,
	inStockShips,
	withCaptinShips,
	finshedShips,
	notSuppledShips,
	rejectedShips,
	withCaptinPage,
	notSupplyedPage,
	finshedPage,
	receivedShips,
	receivePage,
	receiveShip,
	hireCaptinPage,
	receiveFromCaptinPage,
	receiveFromCaptin,
	supplyShip,
	hireCaptin,
	createShip,
	updateShip,
	deleteShip,
	createPage,
	editPage
} = require('../controllers/ships');

// middlewares
const { protect,authorize } = require('../middleware/auth')

// Validation
const { shipValidationRules, createValidate, editValidate } = require('../validation/Ships');

const router = express.Router();


router.use(protect)

router.get('/',authorize('manager','employee'),getShips);

router.get('/add',authorize('manager','employee'),createPage);

router.get('/shippingStatus/new',authorize('manager','employee'),newShips);

router.get('/shippingStatus/withCaptin',authorize('manager','employee'),withCaptinShips);

router.get('/shippingStatus/inStock',authorize('manager','employee'),inStockShips);

router.get('/shippingStatus/finshed',authorize('manager','employee'),finshedShips);

router.get('/shippingStatus/notSuppled',authorize('manager','employee'),notSuppledShips);

router.get('/receiveStatus/rejected',authorize('manager','employee'),rejectedShips);

router.get('/receiveStatus/received',authorize('manager','employee'),receivedShips);

router.get('/receive/:shipId',authorize('manager','employee'),receivePage);

router.get('/hireCaptin/:shipId',authorize('manager','employee'),hireCaptinPage);

router.get('/receiveFromCaptin/:shipId',authorize('manager','employee'),receiveFromCaptinPage);

router.get('/withCaptin',authorize('captin'),withCaptinPage)

router.get('/notSuppled',authorize('captin'),notSupplyedPage)

router.get('/finshed',authorize('captin'),finshedPage)

router.post('/receiveFromCaptin/:shipId',authorize('manager','employee','captin'),receiveFromCaptin);

router.post('/supplyShip/:shipId',authorize('manager','employee','captin'),supplyShip);

router.post('/hireCaptin/:shipId',authorize('manager','employee'),hireCaptin);

router.post('/receive/:shipId',authorize('manager','employee','captin'),receiveShip);

router.post('/create',authorize('manager','employee'),shipValidationRules(),createValidate,createShip);

router.get('/edit/:shipId',authorize('manager','employee'),editPage);

router.post('/update/:shipId',authorize('manager','employee'),shipValidationRules(),editValidate,updateShip);

router.post('/delete/:shipId',authorize('manager','employee'),deleteShip);

router.get('/:shipId',authorize('manager','employee'),getShip);


module.exports = router;