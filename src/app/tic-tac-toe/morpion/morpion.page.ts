import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonRow,
  IonTitle,
  IonToolbar,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';
import {GameService} from "../../services/gameService";
import {SquareComponent} from "../square/square.component";
import {PopupService} from "../../services/popup.service";
import {GameboardComponent} from "../gameboard/gameboard.component";
import {LoaderComponent} from "../../loader/loader.component";

@Component({
  selector: 'app-morpion',
  templateUrl: './morpion.page.html',
  styleUrls: ['./morpion.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, LoaderComponent, IonGrid, IonRow, IonCol, SquareComponent, IonButton, IonIcon, GameboardComponent]
})
export class MorpionPage implements OnInit {
  isLoading = true;
  start_play: string = 'player'
  diffuculty: string = 'facile'

  constructor(private popupService: PopupService, private gameService: GameService) {}

  async startGame(difficulty: string) {
    const startingPlayer = await this.popupService.showStartGamePopup();

    console.log('Qui commence:', startingPlayer);
    console.log('Difficulté sélectionnée:', difficulty);
    this.start_play = startingPlayer;
    this.diffuculty = difficulty;

    this.gameService.startGame(startingPlayer, difficulty);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }

}
