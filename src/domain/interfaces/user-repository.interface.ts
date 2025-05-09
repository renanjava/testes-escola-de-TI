import type { UserResponseProps } from '@/application/dtos/interfaces/user-response.props'

export default interface IUserRepository<TEntity> {
  userLogin(where: any): Promise<TEntity | null>
  user(where: any): Promise<UserResponseProps | null>
  users(params: any): Promise<UserResponseProps[]>
  createUser(data: any): Promise<UserResponseProps>
  updateUser(params: any): Promise<UserResponseProps>
  deleteUser(where: any): Promise<UserResponseProps>
}
