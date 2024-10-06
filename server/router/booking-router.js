const express = require('express');
const router = express.Router();
const bookingForm = require("../controllers/booking-controller");

router.route("/booking_data").post(bookingForm);

module.exports = router;