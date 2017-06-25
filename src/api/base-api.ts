import * as http from 'http';
import * as storage from '../storage';
import * as urls from '../urls';
import * as utils from '../utils';
import {IToken, IRequest, IWebAuth} from '../interfaces';
import * as parser from '../parser';
export class BasAPI {
  private static refreshToken() {
    return new Promise<http.HttpResponse>((resolve, reject) => {
      let tokenData:IToken = storage.getTokenData() || '';
      let config = storage.getWebConfig();
      let url = urls.refreshTokenUrl();

      if(tokenData.accessToken === undefined ) {
        return reject('Oops! missing access token ');
      }
      if(tokenData.refreshToken === undefined ) {
        return reject('Oops! missing refresh token ');
      }
      let params = {
        'grant_type': 'refresh_token',
        'refresh_token': tokenData.refreshToken,
        'client_id': config.clientId
      } 
      let finalUrl:string = url+utils.toQueryString(params)
      let options:http.HttpRequestOptions = {
        url: finalUrl,
        method:'POST'
      } 
      http.request(options).then((res) => {
        parser.getTokenObject(res.content.toJSON()); // saving token;
        resolve(res);
      })
      .catch((error) => {
        reject(error);
      })
    });
  }
  protected static requestData(value:IRequest) {
    return new Promise<http.HttpResponse>((resolve, reject)=> {
      let tokenData:IToken = storage.getTokenData() || '';
      if(tokenData.accessToken === undefined || tokenData.accessToken === '') {
        return reject('Unauthorized! Please login and again!');
      }
      let finalUrl = tokenData.instanceUrl+value.path+'?'+utils.toQueryString(value.params);
      let headers = {
        "Authorization": `Bearer ${tokenData.accessToken}`,
        "Cache-Control": 'no-store',
        "Accept": "application/json"
      }
      if(value.contentType !== undefined) {
        headers['Content-Type'] = value.contentType;
      }
      let options:http.HttpRequestOptions = {
        url: finalUrl,
        method:value.method || 'GET',
        headers:headers,
        content: value.data ? JSON.stringify(value.data) : undefined
      }
      http.request(options)
        .then((res)=> {
          if(res.statusCode === 200) { resolve(res); }
          else if(res.statusCode === 401) {
            this.refreshToken()
            .then((data) => {
              this.requestData(value).then(data => resolve(data)).catch(error => reject(error))
            })
            .catch((error) => {reject(error);});
          }
          else {
            reject(res);
          }
        })
        .catch((error)=> {
          reject(error);
        })
      });
  }
}


