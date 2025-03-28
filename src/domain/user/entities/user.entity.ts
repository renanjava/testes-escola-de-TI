export default class UserEntity {
  role: string
  constructor(
    public realname: string,
    public username: string,
    public email: string,
    public password: string,
  ) {}
}
