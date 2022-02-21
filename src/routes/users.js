const express = require('express');
const  {
	getUsers,
	getClients,
	clientCreatePage,
	clientEditPage,
	getUser,
	createUser,
	updateUser,
	deleteUser,
	createPage,
	editPage,
	changeUserStatus
} = require('../controllers/users');

// middlewares
const { protect , authorize} = require('../middleware/auth')

// Validation
const {
	createValidationRules,
	createValidate,
	editValidationRules,
	editValidate
} = require('../validation/users');

const router = express.Router();


router.use(protect)

router.get('/',authorize('manager'),getUsers);

router.get('/clients',authorize('manager'),getClients);

router.get('/clients/add',authorize('manager'),clientCreatePage)

router.get('/clients/edit/:userId',authorize('manager'),clientEditPage)

router.get('/add',authorize('manager'),createPage);

router.post('/create',authorize('manager'),createValidationRules(),createValidate,createUser);

router.get('/edit/:userId',authorize('manager'),editPage);

router.post('/update/:userId',authorize('manager'),editValidationRules(),editValidate,updateUser);

router.post('/delete/:userId',authorize('manager'),deleteUser);

router.post('/useStatus/:userId',authorize('manager'),changeUserStatus)

router.get('/:userId',authorize('manager'),getUser);


module.exports = router;