import { 
  IWebAuth,
  IToken,
} from './interfaces';
import {
  TOKEN_KEY, 
  CONFIG_WEB_KEY
} from './constants';
import AppSettings = require("application-settings");

export function setWebConfig(value:IWebAuth) {
  saveData(CONFIG_WEB_KEY, value);
}
export function getWebConfig() {
  return <IWebAuth> getData(CONFIG_WEB_KEY);
}
export function clear() {
  AppSettings.clear();
}
export function getTokenData():IToken {
  return <IToken>getData(TOKEN_KEY);
}
export function getAccessToken() {
  let token:IToken = getData(TOKEN_KEY);
  return (token !== undefined)?token.accessToken:'';
}
export function setTokenData(value:IToken) {
  saveData(TOKEN_KEY, value);
}
export function removeAccessToken() {
  let data:IToken = getData(TOKEN_KEY);
  data.accessToken = undefined;
  data.refreshToken = undefined;
  saveData(TOKEN_KEY, data);
}
function saveData(key:string, value:any) {
  AppSettings.setString(key, JSON.stringify(value));
}
function getData(key:string) {
  return JSON.parse(AppSettings.getString(key) || '{}');
}