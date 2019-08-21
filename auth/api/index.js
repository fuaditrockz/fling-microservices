var express = require('express');
const Promise = require('bluebird');
var router = express.Router(); 

const { addUserToDB } = require('./helpers/Users');

/* GET home page. */
router.post('/auth/register', function(req, res, next) {
  Promise.try(async () => {
    const userAdded = await addUserToDB(req.body);
    console.log(userAdded);
    return userAdded;
  })
    .then(response => res.send(response))
    .catch(err => res.send(err))
});

module.exports = router;
