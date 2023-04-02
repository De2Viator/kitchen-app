export class User {
  constructor(public readonly token: string, public readonly expiredTime: number, public readonly id: string) {}
  get isExpired() {
    if(this.expiredTime > new Date().getTime()) return this.token;
    else return '';
  }
}
