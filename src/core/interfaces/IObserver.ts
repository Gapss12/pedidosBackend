export interface IObserver {
  update(event: string, data: any): void
}

export interface ISubject {
  subscribe(observer: IObserver): void
  unsubscribe(observer: IObserver): void
  notify(event: string, data: any): void
}
