# Cymatic on node

Cymatic is a ...

## Instalation

     npm install cymatic.api

## Usage

### Set up cymatic

```javascript
  const Cymatic = require('cymatic.api');

  let cymatic = new Cymatic({
    "tenant" : {
      "name"     : "app",
      "clientId" : "myApp",
      "secret"   : "shh.this.is.a.secret",
    }
  });
```

### Verify

```javascript

  cymatic.verify(token).then( verification => {
    // { verificaion } response
  }, error => {
    // something whent wrong validating the user data
  });

```
