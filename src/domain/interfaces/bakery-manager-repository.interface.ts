export default interface IBakeryManagerRepository<TEntity> {
  bakeryManager(where: any): Promise<TEntity | null>
  bakeryManagers(params: any): Promise<TEntity[]>
  createBakeryManager(data: any): Promise<TEntity>
  deleteBakeryManager(where: any): Promise<TEntity>
}
