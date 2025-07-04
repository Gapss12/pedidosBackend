export class Order {
  constructor(
    public id: string,
    public userId: string,
    public status: string,
    public total: number,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}
