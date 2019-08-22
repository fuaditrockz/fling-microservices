const mongoose   = require('mongoose');
const platform   = require('platform');
const ip         = require('ip');
const UsersModel = require('../models/users');
const AuthModel  = require('../models/auth');

exports.addUserToDB = data => {
	const user = new UsersModel({
		first_name: data.first_name,
		last_name: data.last_name,
		auth: {
			email: data.email,
			password: data.password
		},
	})

	const result = user.save()
			.then(res => {
				return res;
			})
			.catch(err => {
					console.log(err);
					return err;
			})

	return result;
}

exports.checkEmailinDB = email => {
	const result = UsersModel.findOne(
		{ 'auth.email': email }
	)
	return result;
}

exports.authSession = (res, data, ua) => {
	const auth = new AuthModel({
		user_id: res.id,
		device_info: platform.parse(ua),
		access_token: '1234',
		auth_type: 'email',
		ip_location: ip.address()
	})

	const result = auth.save()
	  .then(response => {
			return response;
		})
		.catch(err => {
			console.log(err);
			return err;
		})
	return result;
}