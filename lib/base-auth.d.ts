import { Observable } from 'data/observable';
import { IToken } from './interfaces';
import { Page } from 'ui/page';
export declare class BaseAuth extends Observable {
    private _token;
    private page;
    private webPage;
    private _tokenData;
    constructor(page: Page);
    protected doWebLogin(): void;
    protected doLogout(page: Page): void;
    private openWebPage(url);
    tokenData: IToken;
    private setTokenAndCloseLogin(value);
}
