const express = require('express');
const router = express.Router();
const facility = require('../controllers/facility-controller');

router.route('/facility').get(facility);

module.exports = router;