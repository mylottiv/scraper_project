const router = require('express').Router();
const viewController = require('../../controllers/viewController')

router.get('/', viewController.serveHome);

router.get('/saved', viewController.serveSaved)

module.exports = router;