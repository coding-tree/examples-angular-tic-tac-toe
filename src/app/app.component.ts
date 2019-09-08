import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Tile } from './models/tile';
import { Player } from './models/player';
import { GameService } from './services/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {

  constructor(
    public gameService: GameService,
  ) { }

  ngOnInit() {
    this.gameService.initPlayers();
  }
}
