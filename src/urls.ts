import * as storage from './storage';
import { 
  IWebAuth,
  IToken,
} from './interfaces';
import {
  TOKEN_KEY, 
  CONFIG_WEB_KEY,
  AUTHORIZE_URL,
  LOGOUT_URL,
  DEFAULT_API_VERSION,
  REFRESH_TOKEN
} from './constants';
export function loginUrl(type:string | 'code' | 'token') {
  let config:IWebAuth = storage.getWebConfig();
  return (config !== undefined) ? encodeURI(`${config.loginUrl}${AUTHORIZE_URL}?response_type=${type}&client_id=${config.clientId}&redirect_uri=${config.calbackUrl}&display=touch`) : '';
} 
export function logoutUrl() {
  return (getRoot() !== '')? `${getRoot()}${LOGOUT_URL}` : '';
}
export function refreshTokenUrl() {
  return (getRoot() !== undefined)? `${getRoot()}${REFRESH_TOKEN}` : '';
}
export function queryUrl() {
  let config:IWebAuth = storage.getWebConfig();
  let apiVersion = config.apiVersion || DEFAULT_API_VERSION;
  return (getRoot()!== undefined)?`${getRoot()}/services/data/${ apiVersion }/query/?`:'';
}

function getRoot() {
  let tokenData:IToken = storage.getTokenData();
  return (tokenData.instanceUrl !== undefined)? tokenData.instanceUrl : '';
}