export class Product {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: number,
    public stock: number,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}
