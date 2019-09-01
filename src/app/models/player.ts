export class Player {
  turn: boolean;
  sign: string;

  constructor(t: boolean, w: string) {
    this.turn = t;
    this.sign = w;
  }
}
