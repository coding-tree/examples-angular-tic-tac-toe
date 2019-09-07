import { Tile } from '../models/tile';
import { Player } from '../models/player';

export class GameService {
  tiles: Tile[];
  gameTurn: Player;
  endGame: boolean;

  players: Player[];
  occupiedBlock: number;

  constructor() {
    this.newGame();
  }

  initTiles(): void {
    this.tiles = [];
    this.occupiedBlock = 0;
    for (let i = 0; i < 9; i++) {
      const tile = new Tile(true, '');

      this.tiles.push(tile);
    }
  }

  initPlayers(): void {
    this.players = [];
    this.players.push(new Player('X', 'Player 1'));
    this.players.push(new Player('O', 'Player 2'));
    this.gameTurn = this.players[0];
  }

  handleMove(item: Tile): void {
    console.log('turn -> ' + this.gameTurn.name);
    if (item.empty) {
      item.value = this.gameTurn.sign;
      this.occupiedBlock++;
      item.empty = false;
      this.showAlertForEnd(this.checkIfWin(this.tiles));
      this.changeTurn();
    }
  }

  changeTurn(): void {
    this.gameTurn === this.players[1] ? this.gameTurn = this.players[0] : this.gameTurn = this.players[1];
  }

  checkIfWin(tiles: Tile[]): boolean {
    const victoryConditions = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
       [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
       [0, 4, 8], [2, 4, 6], // diagonals
     ];
    for (const condition of victoryConditions) {
      if (!tiles[condition[0]].empty && tiles[condition[0]].value === tiles[condition[1]].value
        && tiles[condition[1]].value === tiles[condition[2]].value) {
          return true;
      }
    }
  }

  newGame(): void {
    this.initPlayers();
    this.initTiles();
  }

  showAlertForEnd(val: boolean): void {
    const textMsg = 'Do you want to restart game?';
    let msg = '';
    if (val ) {
      msg = 'Win';
      this.alertWithMessage(msg, this.gameTurn.name, textMsg);
    } else if (this.occupiedBlock > 8) {
      msg = 'Draw';
      this.alertWithMessage(msg, '', textMsg);
    }
  }

  alertWithMessage(msg: string, player = '', com: string): void {
    setTimeout(() => {
      const restart = confirm(`${msg} ${player}
${com}`);
      if (restart) {
        this.newGame();
      }
    }, 100);
  }
}
