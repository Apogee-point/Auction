const express = require('express')

const router = express.Router();

const{showData} = require('../controllers/users');
const verifyToken = require('../middleware/auth');

router.route('/:id').get(verifyToken, showData);
// router.route('/fcm').post(getFcmToken);

module.exports = router;