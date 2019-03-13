const settings = require('../config/settings');
const request  = require('request');
const jwt      = require('jsonwebtoken');
const moment   = require('moment');

module.exports = class IDP {

  constructor () {
    let host = settings.cymatic.idp;
    this.endpoint     = `${host}/auth/realms/${settings.tenant.name}/protocol/openid-connect/token/`;
    this.authHeader   = 'Basic ' + Buffer.from(settings.tenant.clientId + ':' + settings.tenant.secret).toString('base64');
    this.access_token = null;
  }

  /*
   * Authenticate against Cymatic
   * */
  auth () {
    return new Promise( (resolve, reject) => {

      if(!this.access_token){
        return this.fetchToken().then(this.parseToken.bind(this)).then(resolve, reject);
      }

      let expirationDate = moment.unix(this.payload.exp);
      let now            = moment();

      // expired
      if(now.isAfter(expirationDate)){
        return this.fetchToken().then(this.parseToken.bind(this)).then(resolve, reject);
      }

      return resolve(this.access_token);
    });
  }

  fetchToken(){
    return new Promise( (resolve, reject) => {
      let headers = { Authorization : this.authHeader }
      let form    = { grant_type : 'client_credentials' };

      request.post({ url : this.endpoint, headers , form }, function(error, response, body){
        if(error){ return reject(error); }
        if(response.statusCode >= 400){ return reject(body); }
        return resolve(JSON.parse(body));
      });
    });
  }

  parseToken(tokenInfo){
    return new Promise( (resolve, reject) => {
      this.payload      = jwt.decode(tokenInfo.access_token);
      this.access_token = tokenInfo.access_token;
      return resolve(this.access_token);
    });
  }

};
