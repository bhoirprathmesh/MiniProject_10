const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    recycleItem: { type: String, required: true },
    recycleItemPrice: { type: Number, required: true },
    pickupDate: { type: Date, required: true },
    pickupTime: { type: String, required: true },
    facility: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
