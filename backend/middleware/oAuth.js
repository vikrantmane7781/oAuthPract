var axios = require("axios");

const tokenEndpoint = "https://dev-bbf8r3dvqvbv14uk.us.auth0.com/oauth/token";

 oAuth = (req, res, next) => {
  var code = req.query.code;

  if(!code) {
    res.status(401).send("Missing authorization code");
  }

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("client_id", "QhSYXWjEDF2xY88Om4MPfRCxce7lPoD9");
  params.append("client_secret", "YTbWKVZMchJQAm2OjOjisCyx7o4rEPZN-n6sxznFYtGfAZyDlGXRav6FTeIBorhm")
  params.append("code", code);
  params.append("redirect_uri", "http://localhost:3000/challenges");

  axios.post(tokenEndpoint, params)
  .then(response => {
    req.oauth = response.data;
    next();
  })
  .catch(err => {
    console.log(err);
    res.status(403).json(`Reason: ${err.message}`);
  })
}

module.exports = oAuth;