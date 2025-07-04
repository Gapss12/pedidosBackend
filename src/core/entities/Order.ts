export class Order {
  constructor(
    public id: number,
    public userId: number,
    public status: string,
    public total: number,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}
