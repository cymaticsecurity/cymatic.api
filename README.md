# Cymatic on node

Cymatic is a ...

## Instalation

     npm install cymatic.api

## Usage

### Set up cymatic

```javascript
  const Cymatic = require('cymatic.api');

  let cymatic = new Cymatic();
```

### Register

```javascript

  cymatic.register({ jwt, alias }).then( registration => {
    // { registration } response
  }, error =>{
    // something whent wrong on the registration process
  });

```

### Verify

```javascript

  cymatic.verify({ jwt, c_uuid }).then( verification => {
    // { verificaion } response
  }, error =>{
    // something whent wrong validating the user data
  });

```

### Login

In order to `login` a user it will first need to get `verified` using `cymatic.verify`

```javascript

  cymatic.login({ jwt, c_uuid }).then( session => {
    // { session } response
  }, error =>{
    // something whent wrong creating the session
  });

```

### Logout

To `logout` a user, use the sid granted on `login`

```javascript

  cymatic.logout(sid).then( signout => {
    // { signout } response
  }, error =>{
    // something whent wrong creating the session
  });

```
