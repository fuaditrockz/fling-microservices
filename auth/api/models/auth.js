const mongoose = require('mongoose');

const Auth = mongoose.Schema({
    user_id: { type: String, required: true },
    device_info: {},
    access_token: { type: String, required: true },
    auth_type: { type: String, required: true },
    expires_in: { type: Date },
    created_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('auth', Auth);