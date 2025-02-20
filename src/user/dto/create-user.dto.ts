export interface ICreateUserDto {
  name: string
  username: string
  email: string
  password: string
}

export class CreateUserDto implements ICreateUserDto {
  name: string
  username: string
  email: string
  password: string
}
