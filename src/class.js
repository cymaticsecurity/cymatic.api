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

  verify(token){
    return new Promise( (resolve, reject) =>{
      this.idp.auth().then( access_token => {
        this.api.verify({
          json    : { token },
          headers : { Authorization : `Bearer ${access_token}` }
        }).then(resolve, reject);
      } ,reject);
    });
  }
};
