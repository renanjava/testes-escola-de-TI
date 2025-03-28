export default interface IUserRepository<TEntity> {
  user(where: any): Promise<TEntity | null>
  users(params: any): Promise<TEntity[]>
  createUser(data: TEntity): Promise<TEntity>
  updateUser(params: any): Promise<TEntity>
  deleteUser(where: any): Promise<TEntity>
}
