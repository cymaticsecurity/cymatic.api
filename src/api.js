const settings = require('../config/settings');
const request  = require('request');

module.exports = class API {

  constructor () {
  }

  /*
   * param json @Object
   * {
   *   <jwt>   : 'j.w.t'
   *   [alias] : 'email@example.com'
   * }
   * */
  register(options){
    let data = options.json;
    return new Promise( (resolve, reject) => {
      if(!data || typeof data !== 'object'){ return reject('Malformed or missing JSON param'); }
      if(!data.jwt){ return reject("Missing 'jwt', Json Web Token coming from your SDK"); }

      request.post(Object.assign( options, {
        url : `${settings.cymatic.api}/profiles`
      }), (error, response, body) => {
        if(error){ return reject(error); }
        if(response.statusCode >= 400){ return reject(body); }
        return resolve(body);
      });
    });
  }

  /*
   * param json @Object
   * {
   *   jwt    : 'j.w.t'
   *   c_uuid : 'profile identifier'
   * }
   * */
  verify(options){
    let data = options.json;
    return new Promise( (resolve, reject) => {
      if(!data || typeof data !== 'object'){ return reject('Malformed or missing JSON param'); }
      if(!data.c_uuid){ return reject("Missing 'c_uuid', profile identifier you received when creating it on Cymatic"); }
      if(!data.jwt){   return reject("Missing 'jwt', Json Web Token coming from your SDK"); }

      request.post(Object.assign( options, {
        url : `${settings.cymatic.api}/verify`
      }), (error, response, body) => {
        if(error){ return reject(error); }
        if(response.statusCode >= 400){ return reject(body); }
        return resolve(body);
      });
    });
  }

  /*
   * param json @Object
   * {
   *   jwt    : 'j.w.t'
   *   c_uuid : 'profile identifier'
   * }
   * */
  login(options){
    let data = options.json;
    return new Promise( (resolve, reject) => {
      if(!data || typeof data !== 'object'){ return reject('Malformed or missing JSON param'); }
      if(!data.c_uuid){ return reject("Missing 'c_uuid', profile identifier you received when creating it on Cymatic"); }
      if(!data.jwt){   return reject("Missing 'jwt', Json Web Token coming from your SDK"); }

      request.post(Object.assign( options, {
        url : `${settings.cymatic.api}/login`
      }), (error, response, body) => {
        if(error){ return reject(error); }
        if(response.statusCode >= 400){ return reject(body); }
        return resolve(body);
      });
    });
  }

  /*
   * param session_id @String
   * */
  logout(options){
    let data = options.json;
    return new Promise( (resolve, reject) => {
      if(!data || typeof data !== 'object'){ return reject('Malformed or missing JSON param'); }
      if(!data.session_id){ return reject("Missing 'session_id', session id provided for a user on login"); }
      if(!data.jwt){   return reject("Missing 'jwt', Json Web Token coming from your SDK"); }

      request.post(Object.assign(options, {
        url : `${settings.cymatic.api}/logout`
      }), (error, response, body) => {
        if(error){ return reject(error); }
        if(response.statusCode >= 400){ return reject(body); }
        return resolve(body);
      });
    });
  }

};
