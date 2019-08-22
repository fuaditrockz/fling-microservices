var express = require('express');
const Promise = require('bluebird');
const platform   = require('platform');
var router = express.Router(); 

const { addUserToDB, authSession, checkEmailinDB } = require('./helpers');

router.post('/auth/register', function(req, res, next) {
  Promise.try(async () => {
    const result = await checkEmailinDB(req.body.email)
    return result;
  })
  .then(response => {
    if(!response) {
      const userAdded = addUserToDB(req.body);
      console.log(userAdded);
      return userAdded;
    } else {
      res.send(response);
    }
  })
  .then(async response => {
    const authAdded = await authSession(response, req.body, req.headers['user-agent']);
    res.send(authAdded);
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
