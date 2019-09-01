import { Tile } from '../models/tile';
import { Player } from '../models/player';

export class GameService {
  tiles: Tile[];

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
    this.players.push(new Player(true, 'X'));
    this.players.push(new Player(false, 'O'));
  }

  makeSign(item: Tile): void {
    const playerSign = this.checkPlayerTurn();
    console.log('turn -> ' + playerSign);
    if (item.empty) {
      item.value = playerSign;
      this.occupiedBlock++;
      item.empty = false;
    }
    this.checkIfWin(this.tiles);
  }

  checkPlayerTurn(): string {
    if (this.players[0].turn) {
      this.players[0].turn = false;
      this.players[1].turn = true;
      return this.players[0].sign;
    } else if (this.players[1].turn) {
      this.players[1].turn = false;
      this.players[0].turn = true;
      return this.players[1].sign;
    }
  }

  checkIfWin(tiles: Tile[]): void {
    if (!tiles[0].empty && tiles[0].value === tiles[1].value && tiles[0].value === tiles[2].value ) {
      this.showWinner(tiles[0].value);
    } else if (!tiles[0].empty && tiles[0].value === tiles[3].value && tiles[0].value === tiles[6].value) {
      this.showWinner(tiles[0].value);
    } else if (!tiles[0].empty && tiles[0].value === tiles[4].value && tiles[0].value === tiles[8].value) {
      this.showWinner(tiles[0].value);
    } else if (!tiles[1].empty && tiles[1].value === tiles[4].value && tiles[1].value === tiles[7].value) {
      this.showWinner(tiles[1].value);
    } else if (!tiles[2].empty && tiles[2].value === tiles[4].value && tiles[2].value === tiles[6].value) {
      this.showWinner(tiles[2].value);
    } else if (!tiles[2].empty && tiles[2].value === tiles[5].value && tiles[2].value === tiles[8].value) {
      this.showWinner(tiles[2].value);
    } else if (!tiles[3].empty && tiles[3].value === tiles[4].value && tiles[3].value === tiles[5].value) {
      this.showWinner(tiles[3].value);
    } else if (!tiles[6].empty && tiles[6].value === tiles[7].value && tiles[6].value === tiles[8].value) {
      this.showWinner(tiles[6].value);
    } else if (this.occupiedBlock > 8) {
      setTimeout(() => {
        const restart = confirm('draw ' + ' \n Do you want to restart game?');
        if (restart) {
          this.newGame();
        }
      }, 100);
    }
  }

  newGame(): void {
    this.initPlayers();
    this.initTiles();
  }

  showWinner(sign: string): void {
    setTimeout(() => {
      const restart = confirm('win ' + sign + ' \n Do you want to restart game?');
      if (restart) {
        this.newGame();
      }
    }, 100);
  }
}
