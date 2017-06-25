import { IWebAuth } from './interfaces';
import { BaseAuth } from './base-auth';
import { Page } from 'ui/page';
export declare class Auth extends BaseAuth {
    constructor(page: Page);
    login(config: IWebAuth): void;
    private hasToken();
    logout(page: Page): void;
}
