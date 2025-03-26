import UserEntity from "@/domain/user/entities/user.entity";

export default class ManagerEntity Pick<UserEntity 'name', 'email', 'password'> {
  name: string
  email: string
  password: string
}
