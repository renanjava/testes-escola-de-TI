export default class BakeryEntity {
  constructor(
    public name: string,
    public cnpj: string,
    public address: string,
    public openTime: Date,
    public closeTime: Date,
  ) {}
}
