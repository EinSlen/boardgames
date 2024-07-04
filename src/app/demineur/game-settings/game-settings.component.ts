import {Component, EventEmitter, Output} from '@angular/core';
import {IonicModule} from "@ionic/angular";

export enum Difficulty {
  Facile = 'facile',
  Moyen = 'moyen',
  Difficile = 'difficile'
}

export interface GameSettings {
  rows: number;
  cols: number;
  mines: number;
}

export const SETTINGS = {
  [Difficulty.Facile]: { rows: 10, cols: 8, mines: 10 },
  [Difficulty.Moyen]: { rows: 18, cols: 14, mines: 40 },
  [Difficulty.Difficile]: { rows: 24, cols: 20, mines: 99 }
};

@Component({
  selector: 'app-game-settings',
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.scss'],
  imports: [
    IonicModule
  ],
  standalone: true
})
export class GameSettingsComponent{
  @Output() difficultySelected = new EventEmitter<Difficulty>();

  Difficulty = Difficulty;

  selectDifficulty(difficulty: Difficulty) {
    this.difficultySelected.emit(difficulty);
  }

}
