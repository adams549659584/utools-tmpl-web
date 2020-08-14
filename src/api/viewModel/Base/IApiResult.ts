export interface IApiResult<T> {
  Code: number;
  Result: boolean;
  Message: string;
  Data: T;
}

export enum ApiResultCode {
  OK = 200,

  Redirect = 302, // 自动重定向
  ManualRedirect = 30201, // 手动重定向

  InvalidUser = 40000,
  InvalidApp = 40001,
  InvalidToken = 40002,

  AuthFailed = 401,
  RequestLimited = 40101,
  InvalidArgument = 40102,

  ApiStoped = 40200,
  ApiForbidden = 40201,

  NotFound = 404,

  SysError = 500,
  BusinessErr = 50001,
}
