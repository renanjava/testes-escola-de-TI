export default interface IBakeryRepository<TEntity> {
  bakery(where: any): Promise<TEntity | null>
  bakeries(params: any): Promise<TEntity[]>
  createBakery(data: any): Promise<TEntity>
  updateBakery(params: any): Promise<TEntity>
  deleteBakery(where: any): Promise<TEntity>
}
