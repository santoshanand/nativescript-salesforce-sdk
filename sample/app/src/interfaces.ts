export interface IWebAuth {
  clientId:string;
  loginUrl:string;
  calbackUrl:string;
  apiVersion?:string;
}
export interface IUser {
  username:string;
  password:string;
  clientId:string;
  clientSecret:string;
}
export interface IAuth {
  username:string;
  password:string;
  clientId:string;
  clientSecret:string;
}
export interface IToken {
  accessToken?:string;
  expireIn?:string;
  refreshToken?:string;
  state?:string;
  instanceUrl?:string;
  id?:string;
  issuedAt?:string;
  signature?:string;
  scope?:string;
  error?:boolean;
}
export interface IRequest {
  method?:string;
  contentType?: string;
  path:string;
  data?:any;
  params?:any;
}