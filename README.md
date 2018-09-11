# Cymatic on node

Cymatic is a ...

## Instalation

     npm install cymatic

## Usage

### Set up cymatic

```javascript
  const Cymatic = require('cymatic.api');

  let cymatic = new Cymatic({
    token  : 'a.token',
    secret : 'a.secret'
  });

  cymatic.on('error', error => {
    console.log(error);
  });
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

```javascript

  cymatic.login({ jwt, c_uuid }).then( session => {
    // { session } response
  }, error =>{
    // something whent wrong creating the session
  });

```

### Logout

```javascript

  cymatic.logout(sid).then( signout => {
    // { signout } response
  }, error =>{
    // something whent wrong creating the session
  });

```
