import { Component, OnInit } from '@angular/core';
import {GameService} from "../../services/gameService";
import {SquareComponent} from "../square/square.component";
import {NgForOf} from "@angular/common";
import {IonCol, IonFab, IonFabButton, IonGrid, IonIcon, IonRow} from "@ionic/angular/standalone";

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
export class GameboardComponent  implements OnInit {

  constructor(public gameService: GameService) { }

  ngOnInit() {
    // Initialiser le jeu
    this.gameService.startGame('player', 'facile');
  }

  selectSquare(row: number, col: number) {
    // Sélectionner une case
    this.gameService.selectSquare(row, col);
  }

}
