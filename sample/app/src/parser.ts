import * as utils from './utils';
import { EventData, fromObject }from 'data/observable';
import { IWebAuth, IAuth, IUser, IToken } from './interfaces';
import queryString        = require('query-string');
import * as storage from './storage';

export function code(url:string) {
  return utils.getCodeString(url) || '';
}
export function token(url:string) {
  let tokenObject:IToken;
  let tokenString = utils.getTokenString(url) || '';
  if(tokenString !== '') {
    let parsedData = queryString.parse(tokenString) || {};
    tokenObject = getTokenObject(parsedData);
  }
  return tokenObject; 
}
export function getTokenObject(parsedData:any) {
  let token:IToken = {accessToken:'', instanceUrl:''};
  token.accessToken   = parsedData.access_token;
  token.id            = parsedData.id;
  token.instanceUrl   = parsedData.instance_url;
  token.issuedAt      = parsedData.issued_at;
  token.refreshToken  = parsedData.refresh_token;
  token.scope         = parsedData.scope;
  token.signature     = parsedData.signature;

  if(parsedData.refresh_token === undefined) {
    let savedToken:IToken = storage.getTokenData();
    if(savedToken.refreshToken !== undefined) {
      token.refreshToken = savedToken.refreshToken;
    }
  }
  if(token.accessToken !== '' && token.refreshToken !== '') { 
    storage.setTokenData(token);
  }


  return token;
}