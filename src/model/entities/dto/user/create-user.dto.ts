export interface ICreateUserDto {
  realname: string
  username: string
  email: string
  password: string
}

export class CreateUserDto implements ICreateUserDto {
  realname: string
  username: string
  email: string
  password: string
}
