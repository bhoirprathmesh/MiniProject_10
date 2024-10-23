const Booking = require("../models/booking-model");

// *----------------------
// * Booking Appointment Logic (POST)
// *----------------------
const postBookingForm = async (req, res) => {
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

// *----------------------
// * Fetch Booking Appointments Logic (GET)
// *----------------------
const getBookingForm = async (req, res) => {
    try {
        const bookings = await Booking.find();  // Fetch all booking data from the database
        return res.status(200).json({ message: "Bookings fetched successfully", bookings });
    } catch (error) {
        console.error('Error fetching bookings:', error); // Log error for debugging
        return res.status(500).json({ message: "Error fetching bookings", error: error.message });
    }
};

// *----------------------
//* Cancel Booking Logic
// *----------------------
const cancelBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const deletedBooking = await Booking.findByIdAndDelete(bookingId);
        
        if (!deletedBooking) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        return res.status(200).json({ message: "Appointment Canceled Successfully" });
    } catch (error) {
        console.error('Error canceling appointment:', error); // Log error for debugging
        return res.status(500).json({ message: "Failed to cancel appointment", error: error.message });
    }
};

// *----------------------
//* Edit Booking Logic
// *----------------------
const editBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const updatedData = req.body;

        // Ensure the request body contains all necessary fields for the update
        if (!updatedData.recycleItem || !updatedData.recycleItemPrice || !updatedData.pickupDate || !updatedData.pickupTime || !updatedData.facility || !updatedData.address || !updatedData.phone) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const updatedBooking = await Booking.findByIdAndUpdate(bookingId, updatedData, { new: true });

        if (!updatedBooking) {
            return res.status(404).json({ message: "Appointment not found" });
        }

        return res.status(200).json({ message: "Appointment Updated Successfully", updatedBooking });
    } catch (error) {
        console.error('Error updating appointment:', error); // Log error for debugging
        return res.status(500).json({ message: "Failed to update appointment", error: error.message });
    }
};

module.exports = { postBookingForm, getBookingForm, cancelBooking, editBooking };
