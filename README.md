# Native Script Salesforce SDK

It is allows you to easily authenticate with Salesforce using OAuth (User Ajent flow), and to manipulate Salesforce data using a simple API.

## Features

- Asynchronous calls return ES6 promises   
- Complete OAuth login workflow (User Agent)
- Automatically refreshes OAuth access_token (if available) on expiration
- API to manipulate data (create, update, delete, upsert)
- Works with Android and iOS

## Installation

```
tns plugin add nativescript-salesforce-sdk
```

## Uses

```javascript
  let auth = new Auth(page); // must need to pass page object
  let config:IWebAuth = {
    clientId:'3MVG9YDQS5WtC11p8U6jHYOrOLWdUuHO5tK5jXMv0mQCyzZ0cdjYUd93RGSCpQdP87VL6hQbUO3fXYRmAkJxq', 
    calbackUrl:'ns://nativescript/sdk', 
    loginUrl:'https://login.salesforce.com' 
  };
  auth.on('success', (args)=> {
    
    // Query
    Apex.query('select id, Name from Account')
      .then((data)=> {
      // console.log(JSON.stringify(data.content.toJSON().totalSize));
      if(model !== undefined) {
        model.items = data.content.toJSON().records;
      }
    }).catch((err) => {
      console.log(JSON.stringify(err));
    });
    
  }); 
  auth.on('fail', (args)=> {
    console.log('fails '+new Date().getMilliseconds());
  }); 
 
  auth.login(config);

```

Please check [demo application](https://github.com/santoshanand/sample-nativescript-salesforce-sdk)

