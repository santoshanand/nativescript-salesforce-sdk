import { Observable, EventData, fromObject } from 'data/observable';
import { IWebAuth, IAuth, IUser, IToken} from './interfaces';
import {WebView, LoadEventData} from 'ui/web-view';
import {Page} from 'ui/page';
import {Label} from 'ui/label';
import * as frame from 'ui/frame';
import * as urls from './urls';
import { WebPage } from './webpage';
import * as utils from './utils';

/**
 * BaseAuth class is helper class of Auth class.
 * 
 * @export
 * @class BaseAuth
 * @extends {Observable}
 */
export class BaseAuth extends Observable {
  private _token:IToken;
  private page:Page;
  private webPage:WebPage;
  private _tokenData:IToken;
  constructor(page:Page) {
    super();
    this.page = page;
  }

  /**
   * 
   * Used for login (user agent flow)
   * @protected
   * @memberof BaseAuth
   */
  protected doWebLogin() {
    let url:string = urls.loginUrl('token') || '';
    if(url !== '') {
      this.openWebPage(url);
    }
  }


  /**
   * 
   * Used to logged out from salesforce.
   * @protected
   * @param {Page} page 
   * @memberof BaseAuth
   */
  protected doLogout(page:Page) {
    this.page = page;
    let url:string = urls.logoutUrl() || '';
    if(url !== '') {
      this.openWebPage(url);
    }
  } 


  /**
   * 
   * This method used to open a web page
   * @private
   * @param {string} url 
   * @memberof BaseAuth
   */
  private openWebPage(url:string) {
    this.webPage = new WebPage(url, this);
    if(this.page !== undefined) {
      this.page.showModal(<Page>this.webPage, '', (args)=> {},true);
    }
  }


  /**
   * 
   * Token setter
   * @memberof BaseAuth
   */
  set tokenData(value:IToken) {
    this._tokenData = value;
    this.setTokenAndCloseLogin(value);
    this.notifyPropertyChange('tokenData', value);
  }

  /**
   * 
   * Token getter
   * @readonly
   * @memberof BaseAuth
   */
  get tokenData() {
    return this._tokenData;
  }



  /**
   * 
   * To save token and notify authentication event.
   * @private
   * @param {IToken} value 
   * @memberof BaseAuth
   */
  private setTokenAndCloseLogin(value:IToken) {
    this.notify(utils.getAuthEventData());  
    this.webPage.closeModal();
  }

}
