export interface User {
  _id: string,
  username: string,
  email: string,
  password: string,
  token: string,
  admin: boolean,
  balance: Number
}