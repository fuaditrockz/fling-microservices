const mongoose   = require('mongoose');
const platform   = require('platform');
const ip         = require('ip');
const bcrypt     = require('bcrypt');
const jwt        = require('jsonwebtoken');
const _          = require('lodash');
const UsersModel = require('../models/users');
const AuthModel  = require('../models/auth');

const { registerResponse, errorResponse } = require('../utils/responsers');

exports._REGISTER_USER = (data, ua) => {
	const VALIDATION = body => {
		return new Promise((resolve, reject) => {
			if(_.isEmpty(body)) {
				console.log('Body is empty')
				reject();
			}
			resolve(body);
		})
	}

	function checkEmailinDB(payload) {
		const result = UsersModel.findOne({ 'auth.email': payload.email })
		return result;
	}

	async function addUsertoDB(payload, body) {
		if(!payload) {
			const hashingPassword = bcrypt.hashSync(body.password, 10);
			const user = new UsersModel({
				first_name: body.first_name,
				last_name: body.last_name,
				auth: {
					email: body.email,
					password: hashingPassword
				},
			})

			const result = await user.save()
				.then(res => {
					return res;
				})
				.catch(err => {
						return err;
				})

			console.log(result);
			return result;
		} else {
			return errorResponse(
				`Email ${body.email} has been taken. Please make sure you have another email.`,
				401
			)
		}
	}

	async function addAuthtoDB(payload, user_agent) {
		const auth = new AuthModel({
			user_id: payload.id,
			device_info: platform.parse(user_agent),
			access_token: '1234',
			auth_type: 'email',
			ip_location: ip.address()
		})
	
		const result = await auth.save()
			.then(response => {
				return response;
			})
			.catch(err => {
				return err;
			})
	
		return registerResponse(
			'Success added user to DB',
			201,
			result
		);
	}

	return VALIDATION(data)
		.then(res => checkEmailinDB(res))
		.then(res => addUsertoDB(res, data))
		.then(res => addAuthtoDB(res, ua))
		.catch(err => {
			errorResponse(
				`Error in VALIDATION: ${err}`,
				500
			)
		})
}