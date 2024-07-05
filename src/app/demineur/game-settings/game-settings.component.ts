import {Component, EventEmitter, Output, Input} from '@angular/core';
import {IonicModule} from "@ionic/angular";
import {NgClass, NgForOf} from "@angular/common";
import {addIcons} from "ionicons";
import {alertCircleOutline, beer, hammer, happyOutline, skull, skullOutline} from "ionicons/icons";

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
    IonicModule,
    NgClass,
    NgForOf,
  ],
  standalone: true
})
export class GameSettingsComponent {
  @Input() selectedDifficulty: Difficulty = Difficulty.Facile;
  @Output() difficultySelected = new EventEmitter<Difficulty>();

  Difficulty = Difficulty;

  constructor() {
    addIcons({
      'beer': happyOutline,
      'hammer': alertCircleOutline,
      'skull': skullOutline
      });
  }

  selectDifficulty(difficulty: Difficulty) {
    this.selectedDifficulty = difficulty;
    this.difficultySelected.emit(difficulty);
  }

  protected readonly beer = beer;
  protected readonly hammer = hammer;
  protected readonly skull = skull;
  protected readonly happyOutline = happyOutline;
}
