export class OrderDetail {
  constructor(
    public id: number,
    public orderId:number,
    public productId:number,
    public quantity: number,
    public unitPrice: number,
    public subtotal: number,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}
