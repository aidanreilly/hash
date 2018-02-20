//https://nodejs.org/en/docs/guides/simple-profiling/
//to test
//curl -X GET "http://localhost:8080/newUser?username=matt&password=password"
//ab -k -c 20 -n 250 "http://localhost:8080/auth?username=matt&password=password"
//needs curl and ab obvs

var express = require('express');
var app = express();
var crypto = require('crypto');

 app.get('/newUser', (req, res) => {
  let username = req.query.username || '';
  const password = req.query.password || '';

  username = username.replace(/[!@#$%^&*]/g, '');

  if (!username || !password) {
    return res.sendStatus(400);
}

const salt = crypto.randomBytes(128).toString('base64');
const hash = crypto.createHmac('sha256', username, salt)
                   .update(salt)
                   .digest('hex');

username = { salt, hash };

console.log('hashed username = '+hash);
res.sendStatus(200);
});

 app.listen(8080, function () {
  console.log('listening on port 8080!');
});