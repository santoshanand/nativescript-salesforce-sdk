import { EventData } from 'data/observable';
import { Page } from 'ui/page';
import { HelloWorldModel } from './main-view-model'; 
import {Observable} from 'data/observable';

import {
  Auth, 
  IWebAuth, 
  IToken,
  Apex
} from 'nativescript-salesforce-sdk';
let page;
let auth:Auth;
let model:HelloWorldModel;
export function navigatingTo(args: EventData) {
    page = <Page>args.object;
    model =  new HelloWorldModel();
    page.bindingContext = model;
}

export function onTap(args:EventData) {
  if(page !== undefined && auth !== undefined) {
    auth.logout(page);
  }
}

export function onNavigatedTo(args:EventData) {
  let page = <Page>args.object;
  auth = new Auth(page);
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
    
    

    // Retrive 

    /*
    Apex.retrieve('contact', '0036F000022vmlF', 'name')
      .then((data)=> {
        console.log(JSON.stringify(data));
      }).catch((err) => {
        console.log(JSON.stringify(err));
      });
    */

    // Create

    /*
    Apex.create('contact', {FirstName: "John", LastName: "Doe"})
      .then(response => {
          console.log(JSON.stringify(response));
      })
      .catch(error => {
          console.log(JSON.stringify(error));
      });
    */

    // Update

    /*
    let data = {
      Id: "0036F00002AcHuO", 
      FirstName: "Santosh", 
      LastName: "Jogi"
    };
    Apex.update('contact', data).then((res)=> {
      console.log(JSON.stringify(res));
    })
    .catch((error)=> {
      console.log(JSON.stringify(error));
    })
    */

    // delete record

    /*
    Apex.delRecord('contact', '0036F00002AcHuO')
      .then((res)=> {
        console.log(JSON.stringify(res));
      })
      .catch((error)=> {
        console.log(JSON.stringify(error));
      });
    */

    // Upsert

    /*
    Apex.upsert('contact', 'My_Contact_Id__c', '1', {FirstName: "Emma", LastName: "Wong"})
      .then((res) => {
        console.log(JSON.stringify(res));
      })
      .catch(error => {
        console.log(JSON.stringify(error));
      });
    */

    // Rest api

    /*
    Apex.restapi("contacts")
    .then(result => {
      console.log(result)
    })
    .catch(error => {
      console.log(error);
    });
    */

    // versions

    /*
    Apex.versions().then(res=>{
      console.log(JSON.stringify(res));
    })
    .catch(err => {
      console.log(JSON.stringify(err));
    });
    */

    // resources

    /*
    Apex.resources().then(res=>{
      console.log(JSON.stringify(res));
    })
    .catch(err => {
      console.log(JSON.stringify(err));
    });
    */

  }); 
  auth.on('fail', (args)=> {
    console.log('fails '+new Date().getMilliseconds());
  }); 
 
  auth.login(config);
}