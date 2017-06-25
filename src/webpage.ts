import { Page }from 'ui/page';
import { WebView }from 'ui/web-view';
import { EventData, fromObject }from 'data/observable';
import { StackLayout }from 'ui/layouts/stack-layout';
import { View }from 'ui/core/view';
import * as parser from './parser';
import { BaseAuth } from './base-auth';
import { IWebAuth, IAuth, IUser, IToken } from './interfaces';
import {LOGOUT_URL} from './constants';
import * as utils from './utils';
import * as urls from './urls';
import * as storage from './storage';

export class WebPage extends Page {
  private webView:WebView;
  private url:string;
  private baseAuth:BaseAuth;
  private loginUrl:string = '';
  constructor(url:string, baseAuth:BaseAuth) {
    super();
    this.url = url;
    this.baseAuth = baseAuth;
    this.loginUrl = urls.loginUrl('token') || '';
    this.initWebView();
  }
  private initWebView() {
    this.webView = new WebView();
    this.webView.src = this.url;
    this.content = this.webView;
    this.webView.on('tap', (args)=> {
      let currentUrl = this.webView.src || '';
      if(utils.hasString(currentUrl, LOGOUT_URL)) {
        let url:string = urls.loginUrl('token') || '';
        if(url !== '') {
          this.webView.src = url;
        } 
      } 
    });
    this.webView.on('loadStarted', (args)=> {
      let token:IToken = parser.token(args.url || '') || null;
      if(token !== null) {
        this.baseAuth.tokenData = token;
      } 
      let startUrl = args.url || '';
      if(startUrl.indexOf('http://') === 0) {
        this.webView.src = this.loginUrl;
        storage.removeAccessToken();
      } 
    });
    this.webView.on('loadFinished', (args)=> {
      if(utils.hasString(args.url || '', LOGOUT_URL)) {
        storage.removeAccessToken();
        console.log('Logout succcess ');
      } 
    });
  }
  private getAccessToken(code?:string) {
    if(code !== undefined) {
      
    }
  }
}