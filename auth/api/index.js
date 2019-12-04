var express = require('express');
const Promise = require('bluebird');
const platform   = require('platform');
var router = express.Router(); 

const { _REGISTER_USER } = require('./helpers');
const { errorResponse } = require('./utils/responsers');

router.post('/auth/register_2', function(req, res) {
  Promise.try(() => _REGISTER_USER(req.body, req.headers['user-agent']))
  .then(response => res.status(response.status).json(response))
  .catch(err => res.send(errorResponse(
    `Failed to _REGISTER_USER: ${err}`,
    500
  )))
})

module.exports = router;
