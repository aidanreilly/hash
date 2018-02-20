    //https://nodejs.org/en/docs/guides/simple-profiling/
    //to test
    //curl -X GET "http://localhost:8080/newUser?username=matt&password=password"
    //ab -k -c 20 -n 250 "http://localhost:8080/auth?username=matt&password=password"
    //needs curl and ab obvs

    var express = require('express');
    var app = express();
    var crypto = require('crypto');
    //var hash = require('./hashFunction.js');



    function createHash(username) {
      let usr = username;
      usr = usr.replace(/[!@#$%^&*]/g, '');
      const salt = crypto.randomBytes(128).toString('base64');
      const hash = crypto.createHmac('sha256', usr, salt)
      .update(salt)
      .digest('hex');
      username = hash;
      return username;
};

    app.get('/newUser', (req, res) => {
        var hashed = createHash(req.query.username);
        console.log('hashed username = '+hashed);
        res.sendStatus(200);
    });

    app.listen(8080, function () {
      console.log('listening on port 8080!');
  });