import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  savedStats: any;

  constructor(
    public gameService: GameService,
    public modalService: ModalService
  ) { }

  ngOnInit() {
    this.gameService.newGame();
    if (localStorage.getItem('gameState')) {
      this.gameService.loadFromLocalStorage();
    }
    if (localStorage.getItem('gameStats')) {
      this.gameService.players = JSON.parse(localStorage.getItem('gameStats'));
      this.savedStats = this.gameService.players;
    } else {
      this.savedStats = this.gameService.players;
    }
  }

  newGame() {
    this.gameService.newGame();
    this.modalService.open('new-game-modal');
  }

  resetStats() {
    localStorage.removeItem('gameStats');
    for (const item of this.savedStats) {
      item.winNumber = 0;
    }
  }

}
