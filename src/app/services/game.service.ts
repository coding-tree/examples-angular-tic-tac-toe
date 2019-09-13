import { Tile } from '../models/tile';
import { Player } from '../models/player';
import { Injectable } from '@angular/core';
import { ModalService } from './modal.service';

@Injectable()
export class GameService {
  tiles: Tile[];
  gameTurn: Player;
  endGame: boolean;
  winner: Player;

  players: Player[];
  occupiedBlock: number;

  constructor(
    private modalService: ModalService
    ) {
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
    this.players.push(new Player('X', 'Player 1', 0));
    this.players.push(new Player('O', 'Player 2', 0));
  }

  handleMove(item: Tile): void {
    if (item.empty) {
      item.value = this.gameTurn.sign;
      this.occupiedBlock++;
      item.empty = false;
      this.endGame = this.checkIfWin(this.tiles, 3);
      this.winner = this.gameTurn;
      this.changeTurn();
      this.saveToLocalStorage();
    }
    if (this.endGame) {
      this.winner.winNumber++;
      localStorage.setItem('gameStats', JSON.stringify(this.players));
      this.handleAfterEndGame('win-modal', 'gameState');
    } else if (this.occupiedBlock > 8) {
      this.handleAfterEndGame('draw-modal', 'gameState');
    }
  }

  changeTurn(): void {
    this.gameTurn.sign === 'X' ? this.gameTurn = this.players[1] : this.gameTurn = this.players[0];
  }

  checkIfWin(tiles: Tile[], n: number): boolean {
    if (this.checkCols(tiles, n) || this.checkRows(tiles, n) || this.checkDiagonals(tiles, n)) {
      return true;
    }
  }

  checkCols(tiles: Tile[], n: number): boolean {
    for (let i = 0; i < n; i++) {
      for (let j = i + n; j < tiles.length - n; j += n) {
        if (!tiles[j].empty && tiles[j - n].value === tiles[j].value && tiles[j].value === tiles[j + n].value) {
          console.log('kolumny rowne!');
          return true;
        }
      }
    }
  }

  checkRows(tiles: Tile[], n: number): boolean {
    for (let i = 0; i < tiles.length; i += n) {
      for (let j = i + 1; j < i + n - 1; j++) {
        if (!tiles[j].empty && tiles[j - 1].value === tiles[j].value && tiles[j].value === tiles[j + 1].value) {
          console.log('wiersze rowne!');
          return true;
        }
      }
    }
  }

  checkDiagonals(tiles: Tile[], n: number): boolean {
    if (!tiles[0].empty && tiles[0].value === tiles[n + 1].value && tiles[n + 1].value === tiles[tiles.length - 1].value) {
      console.log('przekątna rowna!');
      return true;
    }
    if (!tiles[n - 1].empty && tiles[n - 1].value === tiles[n + 1].value && tiles[n + 1].value === tiles[2 * n].value) {
      console.log('antyprzekątna rowna!');
      return true;
    }
  }

  newGame(): void {
    this.gameTurn = this.players[0];
    this.initTiles();
  }

  saveToLocalStorage() {
    const saved = {
      game: this.tiles,
      turn: this.gameTurn,
      occupied: this.occupiedBlock
    };
    localStorage.setItem('gameState', JSON.stringify(saved));
  }

  loadFromLocalStorage() {
    const savedGame = JSON.parse(localStorage.getItem('gameState'));
    this.tiles = savedGame.game;
    this.gameTurn = savedGame.turn;
    this.occupiedBlock = savedGame.occupied;
  }

  handleAfterEndGame(modal: string, localStorageItem: string) {
    this.modalService.open(modal);
    localStorage.removeItem(localStorageItem);
    this.newGame();
  }
}
