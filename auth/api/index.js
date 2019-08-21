var express = require('express');
const Promise = require('bluebird');
var router = express.Router(); 

const { addUserToDB, authSession, checkEmaiilinDB } = require('./helpers/Users');

/* GET home page. */
router.post('/auth/register', function(req, res, next) {
  /* Promise.try(async () => {
    const userAdded = await addUserToDB(req.body);
    console.log(userAdded);
    return userAdded;
  })
    .then(response => res.send(response))
    .catch(err => res.send(err)) */

  Promise.try(async () => {
    const result = await checkEmaiilinDB(req.body.email)
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

module.exports = router;
