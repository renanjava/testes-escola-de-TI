export interface IAccessToken {
  sign(payload: any): string
}
