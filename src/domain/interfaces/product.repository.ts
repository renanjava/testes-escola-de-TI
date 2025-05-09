export default interface IProductRepository<TEntity> {
  product(where: any): Promise<TEntity | null>
  products(params: any): Promise<TEntity[]>
  createProduct(data: any): Promise<TEntity>
  updateProduct(params: any): Promise<TEntity>
  deleteProduct(where: any): Promise<TEntity>
}
