export default interface IUserRepository<TEntity> {
  userLogin(where: any): Promise<TEntity | null>
  user(where: any): Promise<Omit<TEntity, 'password'> | null>
  users(params: any): Promise<Omit<TEntity, 'password'>[]>
  createUser(data: any): Promise<Omit<TEntity, 'password'>>
  updateUser(params: any): Promise<Omit<TEntity, 'password'>>
  deleteUser(where: any): Promise<Omit<TEntity, 'password'>>
}
