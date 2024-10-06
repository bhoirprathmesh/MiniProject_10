const Booking = require("../models/booking-model");

// *----------------------
//* Booking Appointment Logic
// *----------------------
const bookingForm = async (req, res) => {
    try {
        const response = req.body;
        console.log('Booking request data:', response); // Debug log for request data
        
        // Ensure the response object contains all necessary fields
        if (!response.recycleItem || !response.recycleItemPrice || !response.pickupDate || !response.pickupTime || !response.facility || !response.address || !response.phone) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Try to create the booking in the database
        const booking = await Booking.create(response);

        // Respond with success if booking was created
        return res.status(200).json({ message: "Appointment Accepted Successfully", booking });
    } catch (error) {
        console.error('Error creating booking:', error); // Log error for debugging
        return res.status(500).json({ message: "Appointment Rejected", error: error.message });
    }
};


module.exports = bookingForm;