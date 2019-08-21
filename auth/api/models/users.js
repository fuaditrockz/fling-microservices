const mongoose = require('mongoose');

const Users = mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    contact: {
        phone_number: { type: String },
        address: { type: String }
    },
    gender: { type: String, enum: ['Male', 'Female', 'Not set'], default: 'Not set' },
    avatar: { type: String },
    birth_of_date: { type: Date },
    address: {
        country: { type: String },
        state: { type: String },
        city: { type: String },
        zipcode: { type: String },
        address: { type: String }
    },
    auth: {
        email: { type: String, required: true },
        password: { type: String, required: true }
    },
    is_confirmed: { type: Boolean, default: false },
    is_premiume: { type: Boolean, default: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('users', Users);