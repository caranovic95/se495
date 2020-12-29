const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rentSchema = new Schema({
    make: { type: String, required: true, max: (100, 'Too long') },
    model: { type: String, max: (100, 'Too long') },
    variant: { type: String, max: (100, 'Too long') },
    city: { type: String, lovercase: true },
    street: { type: String, min: (4, "min is 4 characters") },
    image: { type: String, lovercase: true },
    shared: { type: Boolean },
    fuel: { type: String, lovercase: true },
    numberOfSeat: Number,
    numberOfDoor: Number,
    color: { type: String },
    description: { type: String, max: (250) },
    dailyRate: Number,
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Rental', rentSchema);