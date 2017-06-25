import { Observable, EventData, fromObject } from 'data/observable';
import { IWebAuth, IAuth, IUser, IToken} from './interfaces';
import {WebView, LoadEventData} from 'ui/web-view';
import queryString = require('query-string');
import {Page} from 'ui/page';
import {Label} from 'ui/label';
import * as frame from 'ui/frame';
import * as urls from './urls';
import { WebPage } from './webpage';
import * as utils from './utils';

export class BaseAuth extends Observable {
  private _token:IToken;
  private page:Page;
  private webPage:WebPage;
  private _tokenData:IToken;
  constructor(page:Page) {
    super();
    this.page = page;
  }
  protected doWebLogin() {
    let url:string = urls.loginUrl('token') || '';
    if(url !== '') {
      this.openWebPage(url);
    }
  }

  public doLogout(page:Page) {
    this.page = page;
    let url:string = urls.logoutUrl() || '';
    if(url !== '') {
      this.openWebPage(url);
    }
  } 

  private openWebPage(url:string) {
    this.webPage = new WebPage(url, this);
    if(this.page !== undefined) {
      this.page.showModal(<Page>this.webPage, '', (args)=> {},true);
    }
  }

  set tokenData(value:IToken) {
    this._tokenData = value;
    this.setTokenAndCloseLogin(value);
    this.notifyPropertyChange('tokenData', value);
  }
  get tokenData() {
    return this._tokenData;
  }

  private setTokenAndCloseLogin(value:IToken) {
    this.notify(utils.getAuthEventData());  
    this.webPage.closeModal();
  }

}
