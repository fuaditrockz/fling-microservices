const mongoose = require('mongoose');

const Auth = mongoose.Schema({
    user_id: { type: String, required: true },
    device_info: {
        name: { type: String },
        version: { type: String },
        layout: { type: String },
        os: {
            architecture: { type: String },
            family: { type: String },
            version: { type: String }
        },
        description: { type: String }
    },
    ip_location: { type: String },
    access_token: { type: String, required: true },
    auth_type: { type: String, required: true },
    expires_in: { type: Date },
    created_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('auth', Auth);