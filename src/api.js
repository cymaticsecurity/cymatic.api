const settings = require('../config/settings');
const request  = require('request');

module.exports = class API {
  constructor () { }

  verify(options){
    let data = options.json;
    return new Promise( (resolve, reject) => {
      if(!data || typeof data !== 'object'){ return reject('Malformed or missing JSON param'); }
      if(!data.token){ return reject("Missing 'token', Json Web Token coming from your SDK"); }

      request.post(Object.assign( options, {
        url : `${settings.cymatic.api}/verify`
      }), (error, response, body) => {
        if(error || response.statusCode >= 400){
          return reject({
            error : error || body,
            code  : response.statusCode
          });
        }
        return resolve(body);
      });
    });
  }
};
