export class Tile {
  empty: boolean;
  value: string;

  constructor(emp: boolean, val: string) {
    this.empty = emp;
    this.value = val;
  }
}
