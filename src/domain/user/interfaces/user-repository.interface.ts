export default interface IUserRepository<TEntity> {
  user(where: any): Promise<Omit<TEntity, 'password'> | null>
  userLogin(where: any): Promise<TEntity | null>
  users(params: any): Promise<Omit<TEntity, 'password'>[]>
  createUser(data: any): Promise<TEntity>
  updateUser(params: any): Promise<Omit<TEntity, 'password'>>
  deleteUser(where: any): Promise<Omit<TEntity, 'password'>>
}
