const mongoose   = require('mongoose');
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