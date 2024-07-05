import { Component, OnInit } from '@angular/core';
import {SquareComponent} from "../square/square.component";
import {NgForOf} from "@angular/common";
import {IonCol, IonFab, IonFabButton, IonGrid, IonIcon, IonRow} from "@ionic/angular/standalone";
import {Puissance4Service} from "../../services/puissance4Service";

@Component({
  selector: 'app-gameboard',
  templateUrl: './gameboard.component.html',
  styleUrls: ['./gameboard.component.scss'],
  imports: [
    SquareComponent,
    NgForOf,
    IonGrid,
    IonCol,
    IonRow,
    IonFab,
    IonFabButton,
    IonIcon
  ],
  standalone: true
})
export class GameboardComponent implements OnInit {
  canPlace: boolean = true;
  humanPlayer!: string ;
  constructor(public gameService: Puissance4Service) { }

  ngOnInit() {
    // Initialiser le jeu
    this.gameService.startGame('player', 'facile');
    this.humanPlayer = this.gameService.humanPlayer;
  }

  async selectColumn(col: number) {
    // Sélectionner une colonne
    if (this.canPlace) {
      this.canPlace = false;
      await this.gameService.placeCoin(col);
      this.canPlace = true;
    }
  }

}
