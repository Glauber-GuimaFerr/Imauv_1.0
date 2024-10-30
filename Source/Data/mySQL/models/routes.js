const express = require('express');
const router = express.Router();

const ImauvController = require('../controllers/ImauvController');

router.post('/login',ImauvController.login);
router.post('/register', ImauvController.register);
router.get('/me', ImauvController.me);
router.post('/addPoint', ImauvController.addPoint);
router.get('/getPoints', ImauvController.getPoints);
router.put('/editPoint', ImauvController.editPoints);

module.exports = router;