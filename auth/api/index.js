var express = require('express');
const Promise = require('bluebird');
const platform   = require('platform');
var router = express.Router(); 

const { _addUserToDB, _authSession, _checkEmailinDB } = require('./helpers');
const { registerResponse, errorResponse } = require('./utils/responsers');

router.post('/auth/register', function(req, res, next) {
  Promise.try(async () => {
    const result = await _checkEmailinDB(req.body.email)
    return result;
  })
  .then(response => {
    if(!response) {
      const userAdded = _addUserToDB(req.body);
      return userAdded;
    } else {
      return 'user is exist';
    }
  })
  .then(async response => {
    console.log(response);
    try {
      if (response == 'user is exist') {
        res.status(401).send(errorResponse(
          `Email ${req.body.email} has been taken, please make sure you have another email.`,
          401
        ))
      } else {
        const authAdded = await _authSession(response, req.body, req.headers['user-agent']);
        res.status(201).send(registerResponse(
          'Success registered user.',
          201,
          authAdded
        ))
      } 
    } catch (err) {
      res.send('error when insert auth to db. ' + err);
    }
  })
  .catch(err => res.send(err))
});

router.get('/auth/test', function(req, res, next) {
  var ua = req.headers['user-agent'];

	var info = platform.parse(ua);
	let platformSpec = {
		name: info.name,
		version: info.version,
		layout: info.layout,
		os: info.os,
		description: info.description
	}

	res.send(platformSpec);
})

module.exports = router;
