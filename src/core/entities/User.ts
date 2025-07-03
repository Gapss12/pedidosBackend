export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public type: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date(),
  ) {}
}
