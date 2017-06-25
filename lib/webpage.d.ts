import { Page } from 'ui/page';
import { BaseAuth } from './base-auth';
export declare class WebPage extends Page {
    private webView;
    private url;
    private baseAuth;
    private loginUrl;
    constructor(url: string, baseAuth: BaseAuth);
    private initWebView();
    private getAccessToken(code?);
}
