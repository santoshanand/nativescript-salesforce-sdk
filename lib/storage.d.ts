import { IWebAuth, IToken } from './interfaces';
export declare function setWebConfig(value: IWebAuth): void;
export declare function getWebConfig(): IWebAuth;
export declare function clear(): void;
export declare function getTokenData(): IToken;
export declare function getAccessToken(): string;
export declare function setTokenData(value: IToken): void;
export declare function removeAccessToken(): void;
