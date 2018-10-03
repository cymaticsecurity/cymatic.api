const settings     = require('../config/settings');
const EventEmitter = require('events');
const request      = require('request');

module.exports = class Cymatic extends EventEmitter {

  constructor(auth){
    super();

    settings.auth = auth;
    this.valid    = auth.token && auth.secret;
    this.request  = request.defaults({
      headers: {
        'X-Auth-Token'        : auth.token,
        'X-Auth-Token-Secret' : auth.secret
      }
    });

    process.nextTick( () => {
      if(!this.valid){ return this.onError('Missing tokens'); }
    });
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
      if(!this.valid){ return reject('Missing tokens'); }

      if(!json || typeof json !== 'object'){ return reject('Malformed or missing JSON param'); }
      if(!json.alias){ return reject("Missing 'alias', Any human readable identifier [email]"); }
      if(!json.jwt){   return reject("Missing 'jwt', Json Web Token coming from your SDK"); }

      this.request.post(endpoint, { json }, (error, response, body) => {
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
      if(!this.valid){ return reject('Missing tokens'); }

      if(!json || typeof json !== 'object'){ return reject('Malformed or missing JSON param'); }
      if(!json.c_uuid){ return reject("Missing 'c_uuid', profile identifier you received when creating it on Cymatic"); }
      if(!json.jwt){   return reject("Missing 'jwt', Json Web Token coming from your SDK"); }

      this.request.post(endpoint, { json }, (error, response, body) => {
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
   login(json){
    let api      = settings.api;
    let endpoint = `${api.host}/${api.endpoints.login}`;

    return new Promise( (resolve, reject) => {
      if(!this.valid){ return reject('Missing tokens'); }

      if(!json || typeof json !== 'object'){ return reject('Malformed or missing JSON param'); }
      if(!json.c_uuid){ return reject("Missing 'c_uuid', profile identifier you received when creating it on Cymatic"); }
      if(!json.jwt){   return reject("Missing 'jwt', Json Web Token coming from your SDK"); }

      this.request.post(endpoint, { json }, (error, response, body) => {
        if(error){ return reject(error); }
        if(response.statusCode >= 400){ return reject(body); }
        return resolve(body);
      });
    });
  }

  /*
   * param sid @String
   * */
  logout(sid){
    let api      = settings.api;
    let endpoint = `${api.host}/${api.endpoints.logout}/${sid}`;

    return new Promise( (resolve, reject) => {
      if(!this.valid){ return reject('Missing tokens'); }

      if(!sid){ return reject("Missing 'sid', session id provided for a user on login"); }

      this.request.delete(endpoint, (error, response, body) => {
        if(error){ return reject(error); }
        if(response.statusCode >= 400){ return reject(body); }
        return resolve(body);
      });
    });
  }

  onError(error){
    return this.emit('error', new Error(error));
  }

}
