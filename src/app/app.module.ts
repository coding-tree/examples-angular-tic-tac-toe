import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { GameService } from './services/game.service';
import { ModalComponent } from './modal/modal.component';
import { ModalService } from './services/modal.service';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    GameService,
    ModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
