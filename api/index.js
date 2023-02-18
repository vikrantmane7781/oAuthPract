const express = require('express');
const app = express();
const { auth } = require('express-oauth2-jwt-bearer');
var guard = require("express-jwt-permissions")();

const port = process.env.PORT || 8080;

const jwtCheck = auth({
  audience: 'https://www.challange-api.com',
  issuerBaseURL: 'https://dev-bbf8r3dvqvbv14uk.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

// enforce on all endpoints
app.use(jwtCheck);

app.get("/challenges", guard.check(['read:challange']), function (req, res) {
  res.json({
    challenge1: "This is the first challenge",
    challenge2: "This is another challenge",
  });
});

app.listen(port);

console.log('Running on port ', port);