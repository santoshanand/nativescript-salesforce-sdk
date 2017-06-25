import { IAuth, IUser, IWebAuth } from './interfaces';
import { BaseAuth } from './base-auth';
import { Page } from 'ui/page';
import * as storage from './storage';
import * as utils from './utils';
export class Auth extends BaseAuth {
  constructor(page:Page) {
    super(page);
    // storage.clear(); // remove it after development
  }   
  public login(config:IWebAuth) {
    if(!this.hasToken()) {
      storage.setWebConfig(config);
      this.doWebLogin();
    }  
  }
  private hasToken() {
    let value = (storage.getTokenData().accessToken === undefined || storage.getTokenData().refreshToken === undefined)?false:true;
    this.notify(utils.getAuthEventData());
    return value;
  }
  public logout(page:Page) {
    this.doLogout(page);
  }
}