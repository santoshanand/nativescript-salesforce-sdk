import { IWebAuth, IAuth, IUser, IToken } from './interfaces';
import { AUTHORIZE_URL, REVOKE_URL, TOKEN_KEY, LOGOUT_URL} from './constants';
import AppSettings        = require("application-settings");
import * as storage from './storage';
import {EventData, fromObject} from 'data/observable';
let codeString:string     = 'code=';
let tokenString:string    = 'access_token';
let errorString:string    = 'error=access_denied';

export function hasString(value:string, searchString:string) {
  return (value.indexOf(searchString) > -1)?true:false;
}
export function getAuthEventData() {
  let value = (storage.getTokenData().accessToken === undefined || storage.getTokenData().refreshToken === undefined)?false:true;
  let evt:EventData = {
    eventName: value?'success':'fail',
    object:fromObject(storage.getTokenData())
  }
  return evt;
}
function hasError(value:string, searchString:string=errorString) {
  return (value.indexOf(searchString) > -1)?true:false;
}
export function getCodeString(value:string) {
  let code = '';
  if(hasString(value, codeString)) {
    let startIndex = value.indexOf(codeString) + codeString.length;
    code = value.substr(startIndex, value.length); 
  }
  return code;
}
export function parseQueryString(search:string) {
  var obj = search.split("&").reduce(function(prev, curr, i, arr) {
    var p = curr.split("=");
    prev[decodeURIComponent(p[0])] = decodeURIComponent(p[1]);
    return prev;
  }, {});
  return obj;
}

export function getTokenString(value:string) {
  let toeken = '';
  if(hasString(value, tokenString)) {
    let startIndex = value.indexOf(tokenString);
    toeken = value.substr(startIndex, value.length); 
  }
  return toeken;
}

export function toQueryString(obj:any) {
  let parts = [], i;
  for (i in obj) {
      if (obj.hasOwnProperty(i)) {
        parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
      }
  }
  return parts.join("&");
}