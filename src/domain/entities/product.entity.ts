export default class ProductEntity {
  constructor(
    public name: string,
    public description: string,
    public image: string[],
    public price: number,
    public quantity: number,
    public disponibility: boolean,
    public bakeryId: string,
  ) {}
}
