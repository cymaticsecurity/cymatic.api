const settings = require('../config/settings');
const request  = require('request');

module.exports = class Cymatic {

  constructor() {
  }

  /*
   * Simple setter
   * */
  set (key, value) {
    settings.api[key] = value;
  }

  /*
   * param json @Object
   * {
   *   jwt   : 'j.w.t'
   *   alias : 'email@example.com'
   * }
   * */
  register(json){
    let api      = settings.api;
    let endpoint = `${api.host}/${api.endpoints.registration}`;

    return new Promise( (resolve, reject) => {
      if(!json || typeof json !== 'object'){ return reject('Malformed or missing JSON param'); }
      if(!json.alias){ return reject("Missing 'alias', Any human readable identifier [email]"); }
      if(!json.jwt){   return reject("Missing 'jwt', Json Web Token coming from your SDK"); }

      request.post(endpoint, { json }, (error, response, body) => {
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
   verify(json){
    let api      = settings.api;
    let endpoint = `${api.host}/${api.endpoints.verify}`;

    return new Promise( (resolve, reject) => {
      if(!json || typeof json !== 'object'){ return reject('Malformed or missing JSON param'); }
      if(!json.c_uuid){ return reject("Missing 'c_uuid', profile identifier you received when creating it on Cymatic"); }
      if(!json.jwt){   return reject("Missing 'jwt', Json Web Token coming from your SDK"); }

      request.post(endpoint, { json }, (error, response, body) => {
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
   login(data){
    let api      = settings.api;
    let endpoint = `${api.host}/${api.endpoints.login}`;

    return new Promise( (resolve, reject) => {
      if(!data || typeof data !== 'object'){ return reject('Malformed or missing JSON param'); }
      if(!data.c_uuid){ return reject("Missing 'c_uuid', profile identifier you received when creating it on Cymatic"); }
      if(!data.jwt){   return reject("Missing 'jwt', Json Web Token coming from your SDK"); }

      request.post({
        url     : endpoint,
        json    : { c_uuid : data.c_uuid },
        headers : {
          Authorization : `Bearer ${data.jwt}`
        }
      }, (error, response, body) => {
        if(error){ return reject(error); }
        if(response.statusCode >= 400){ return reject(body); }
        return resolve(body);
      });
    });
   }

  /*
   * param session_id @String
   * */
  logout(session_id){
    let api      = settings.api;
    let endpoint = `${api.host}/${api.endpoints.logout}`;

    return new Promise( (resolve, reject) => {
      if(!session_id){ return reject("Missing 'session_id', session id provided for a user on login"); }

      request.post({
        url     : endpoint,
        json    : { session_id }
      }, (error, response, body) => {
        if(error){ return reject(error); }
        if(response.statusCode >= 400){ return reject(body); }
        return resolve(body);
      });
    });
  }

};
