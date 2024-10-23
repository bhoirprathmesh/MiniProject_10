const express = require('express');
const router = express.Router();

const { postBookingForm, getBookingForm, cancelBooking, editBooking } = require("../controllers/booking-controller");

// Separate routes for GET and POST requests
router.route("/booking_data").post(postBookingForm);  // POST to create a booking
router.route("/booking_data").get(getBookingForm); 
router.route("/booking_data/:id").delete(cancelBooking);   // GET to fetch bookings
router.route("/booking_data/:id").put(editBooking);      // PUT route for editing a booking

module.exports = router;
