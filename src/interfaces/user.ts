export interface User {
  _id: string,
  username: String,
  email: string,
  password: string,
  token: string,
  admin: boolean,
  balance: Number
}