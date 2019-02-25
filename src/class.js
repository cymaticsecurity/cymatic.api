const settings = require('../config/settings');
const request  = require('request');
const IDP      = require('./idp');
const API      = require('./api');

module.exports = class Cymatic {

  constructor (options) {
    Object.assign(settings, options)
    this.api = new API();
    this.idp = new IDP();
  }

  login(body){
    return new Promise( (resolve, reject) =>{
      this.idp.auth().then( access_token => {
        this.api.login({
          json    : { c_uuid : body.c_uuid, jwt : body.jwt },
          headers : { Authorization : `Bearer ${access_token}` }
        }).then(resolve, reject);
      } ,reject);
    });
  }

  logout(session_id){
    return new Promise( (resolve, reject) =>{
      this.idp.auth().then( access_token => {
        this.api.logout({
          json    : { session_id },
          headers : { Authorization : `Bearer ${access_token}` }
        }).then(resolve, reject);
      } ,reject);
    });
  }

};
