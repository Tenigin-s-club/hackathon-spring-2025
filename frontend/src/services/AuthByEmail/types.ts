export interface ILoginRequest {
  email: string;
  password: string;
}
export interface ILoginResponse {
  token(arg0: string, token: any): unknown;
  access_token: string;
  token_type: string;
}
