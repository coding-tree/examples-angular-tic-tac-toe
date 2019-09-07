import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor(
    public gameService: GameService,
    public modalService: ModalService
  ) { }

  ngOnInit() {
    if (localStorage.getItem('gameState')) {
      this.gameService.loadFromLocalStorage();
    }
  }

  newGame() {
    this.gameService.newGame();
    this.modalService.open('new-game-modal');
  }

}
