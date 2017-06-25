import { IAuth, IUser, IWebAuth } from './interfaces';
import { BaseAuth } from './base-auth';
import { Page } from 'ui/page';
import * as storage from './storage';
import * as utils from './utils';

/**
 * Authentication class responsible to facilcitate the login, logout etc.
 * 
 * @export
 * @class Auth
 * @extends {BaseAuth}
 */
export class Auth extends BaseAuth {
  constructor(page:Page) {
    super(page);
  }   

  /**
   * 
   * Used to login into salesforce
   * @param {IWebAuth} config 
   * @memberof Auth
   */
  public login(config:IWebAuth) {
    if(!this.hasToken()) {
      storage.setWebConfig(config);
      this.doWebLogin();
    }  
  }

  /**
   * 
   * To check logged in or not and responsible to dispach logged in event
   * @private
   * @returns 
   * @memberof Auth
   */
  private hasToken() {
    let value = (storage.getTokenData().accessToken === undefined || storage.getTokenData().refreshToken === undefined)?false:true;
    this.notify(utils.getAuthEventData());
    return value;
  }

  /**
   * 
   * To logout from salesforce.
   * @param {Page} page 
   * @memberof Auth
   */
  public logout(page:Page) {
    this.doLogout(page);
  }
}