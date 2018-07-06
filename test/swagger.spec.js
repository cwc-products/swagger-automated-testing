'use strict';
var mocha = require('mocha');
var chakram = require('chakram');
var request = chakram.request;
var expect = chakram.expect;

/*describe('hooks', function() {
  before(function() {
    var response = request('get', 'http://localhost:3000/api/v1//auth/token/create', {
      'time': true
    });

    chakram.setRequestDefaults({
      headers :  {
        'Authorization': 'Bearer ' + response.body.token
      }});

    return chakram.wait();
  });
});
*/

before(function () {
  return chakram.get('http://localhost:3000/auth/token/create')
  .then(function (apiAuthenticatedResponse) {
//      console.log(apiAuthenticatedResponse.body);
      var token = apiAuthenticatedResponse.body.token;
//      console.log(token);
      chakram.setRequestDefaults({
        headers :  {
          'Authorization': 'Bearer ' + token
        }});

  })

  //return chakram.wait();
});

describe('tests for /api/v1/attributes/{type}', function() {
  /*before(function() {
    var response = request('get', 'http://localhost:3000/auth/token/create', {
      'time': true
    });

    chakram.setRequestDefaults({
      headers :  {
        'Authorization': 'Bearer ' + response.body.token
      }});

    return chakram.wait();
  });
*/

/*before(function () {
  chakram.get('http://localhost:3000/auth/token/create')
  .then(function (apiAuthenticatedResponse) {
//      console.log(apiAuthenticatedResponse.body);
      var token = apiAuthenticatedResponse.body.token;
//      console.log(token);
      chakram.setRequestDefaults({
        headers :  {
          'Authorization': 'Bearer ' + token
        }});
      return chakram.wait();
  })

});*/

  describe('tests for get', function() {
        it('should respond 200 for "OK"', function() {
            var response = request('get', 'http://localhost:3000/api/v1/attributes/hollandcode', { 
                'time': true
            })

            expect(response).to.have.status(200)
            return chakram.wait();
        });

        it('should respond 401 for "Access token is missing or invalid"', function() {
            var response = request('get', 'http://localhost:3000/api/v1/attributes/hollandcode', { 
                'time': true
            });

            expect(response).to.have.status(401)
            return chakram.wait();
        });    
    });
});