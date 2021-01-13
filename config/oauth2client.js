const {OAuth2Client} = require('google-auth-library');
const keys = require('./client-google.json');


const oAuth2Client = new OAuth2Client(
  keys.web.client_id,
  keys.web.client_secret,
  keys.web.redirect_uris[0]
);

oAuth2Client.setCredentials({
refresh_token: keys.refresh_token
});

module.exports = oAuth2Client;

