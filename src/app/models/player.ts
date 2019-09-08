export class Player {
  sign: string;
  name: string;
  winNumber: number;

  constructor(s: string, n: string, w: number) {
    this.sign = s;
    this.name = n;
    this.winNumber = w;
  }
}
