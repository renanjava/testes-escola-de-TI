export default interface IManagerRepository<TEntity> {
  manager(where: any): Promise<TEntity | null>
  managers(params: any): Promise<TEntity[]>
  createManager(data: any): Promise<TEntity>
  updateManager(params: any): Promise<TEntity>
  deleteManager(where: any): Promise<TEntity>
}
