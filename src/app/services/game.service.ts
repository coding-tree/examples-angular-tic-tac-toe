import { Tile } from '../models/tile';
import { Player } from '../models/player';

export class GameService {
  tiles: Tile[];
  gameTurn: Player;
  endGame: boolean;

  players: Player[];
  occupiedBlock: number;

  constructor() {
    this.initTiles();
    this.initPlayers();
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

  makeSign(item: Tile): void {
    console.log('turn -> ' + this.gameTurn.name);
    if (item.empty) {
      item.value = this.gameTurn.sign;
      this.occupiedBlock++;
      item.empty = false;
      this.endGame = this.checkIfWin(this.tiles);
      this.showWinner(this.endGame);
      this.changeTurn();
    }
  }

  changeTurn(): void {
    this.gameTurn === this.players[1] ? this.gameTurn = this.players[0] : this.gameTurn = this.players[1];
  }

  // handleMove(index: number): void {
  //   if (!this.winner && !this.gameArray[index]) {
  //     this.gameArray[index] = this.player;
  //     if (this.winningMove()) {
  //       this.winner = this.player;
  //     }
  //     this.player = this.player === CellValue.X ? CellValue.O : CellValue.X;
  //   }
  // }

  // winningMove(): boolean {
  //   const victoryConditions = [
  //     [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  //     [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  //     [0, 4, 8], [2, 4, 6], // diagonals
  //   ];
  //   for (const condition of victoryConditions) {
  //     if (this.gameArray[condition[0]]
  //       && this.gameArray[condition[0]] === this.gameArray[condition[1]]
  //       && this.gameArray[condition[1]] === this.gameArray[condition[2]]) {
  //       return true;
  //     }
  //   }

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

  showWinner(val: boolean): void {
    if (val ) {
      setTimeout(() => {
        const restart = confirm('win ' + this.gameTurn.name + ' \n Do you want to restart game?');
        if (restart) {
          this.newGame();
        }
      }, 100);
    } else if (this.occupiedBlock > 8) {
      setTimeout(() => {
        const restart = confirm('Draw! \n Do you want to restart game?');
        if (restart) {
          this.newGame();
        }
      }, 100);
    }
  }
}
