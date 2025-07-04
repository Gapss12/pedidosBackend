export class OrderDetail {
  constructor(
    public id: string,
    public orderId:string,
    public productId:string,
    public quantity: number,
    public unitPrice: number,
    public subtotal: number,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}
