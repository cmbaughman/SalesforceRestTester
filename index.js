var config = require('config').get('sf'),
  request = require('request-promise'),
  Promise = require('bluebird');

var options = {
  url: config.server,
  method: 'POST',
  formData: {
    client_id: config.key,
    client_secret: config.secret,
    grant_type: 'password',
    username: config.user,
    password: config.password
  }
};

request(options)
  .then(JSON.parse)
  .then(getToken)
  .then(testEndpointRestParam)
  .catch(console.error);

function getToken(data) {
  console.log('TOKEN: ', data.access_token);
  return data.access_token;
}

function testEndpointRestParam(token) {
  //test param in this case is passed via url.
  //if you want to post something, simply reuse options.formData.
  options.url = config.endpoint + '/003q0000005swMuAAI';
  options.method = 'GET';
  options.headers = {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  };
  delete options.formData;
  
  request(options)
    .then(console.dir)
    .catch(console.error);
}