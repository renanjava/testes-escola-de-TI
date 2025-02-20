export interface ICreateUserDto {
  name: string
  user: string
  email: string
  password: string
}

export class CreateUserDto implements ICreateUserDto {
  name: string
  user: string
  email: string
  password: string
}
