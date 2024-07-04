import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab, IonFabButton,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {Difficulty, GameSettingsComponent} from "../game-settings/game-settings.component";
import {ModalController, NavController} from "@ionic/angular";
import {DidactModalComponent} from "../../didact-modal/didact-modal.component";
import {addIcons} from "ionicons";
import {arrowBackCircleOutline, closeCircleOutline, helpCircleOutline} from "ionicons/icons";
import {PopupService} from "../../services/popup.service";
import {MinesweeperService} from "../../services/minesweeper-sevice.service";

@Component({
  selector: 'app-minesweeper',
  templateUrl: './minesweeper.page.html',
  styleUrls: ['./minesweeper.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, GameSettingsComponent, IonButton, IonButtons, IonIcon, IonFab, IonFabButton]
})
export class MinesweeperPage implements OnInit {
  difficulty: Difficulty = Difficulty.Facile;
  fini: boolean = false;

  constructor(
    private navCtrl: NavController,
    private modalController: ModalController,
    private popupService: PopupService,
    private minesweeperService: MinesweeperService
  ) {
    addIcons({
      'close-circle-outline': closeCircleOutline,
      'help-circle-outline': helpCircleOutline,
      'arrow-back-circle-outline': arrowBackCircleOutline
    });
  }

  ngOnInit() {
    this.startGame(this.difficulty);
  }

  startGame(difficulty: Difficulty) {
    this.minesweeperService.startGame(difficulty);
    this.fini = false;
  }

  revealCell(row: number, col: number) {
    if (this.fini) {
      return;
    }
    const result = this.minesweeperService.revealCell(row, col);
    if (result === 'gameOver') {
      this.fini = true;
      this.popupService.showGameResultPopup("bomb", (difficulty) => {
        if (difficulty == "facile") {
          this.startGame(Difficulty.Facile);
        } else if (difficulty == "medium") {
          this.startGame(Difficulty.Moyen);
        } else {
          this.startGame(Difficulty.Difficile);
        }
      });
    } else if (result === 'win') {
      this.fini = true;
      this.popupService.showGameResultPopup("player", (difficulty) => {
        if (difficulty == "facile") {
          this.startGame(Difficulty.Facile);
        } else if (difficulty == "medium") {
          this.startGame(Difficulty.Moyen);
        } else {
          this.startGame(Difficulty.Difficile);
        }
      });
    }
  }

  toggleFlag(event: MouseEvent, row: number, col: number) {
    event.preventDefault();
    this.minesweeperService.toggleFlag(row, col);
  }

  goBack() {
    this.navCtrl.back();
  }

  async openDidactModal() {
    const modal = await this.modalController.create({
      component: DidactModalComponent,
      componentProps: {
        gameName: 'demineur'
      }
    });
    modal.present();
  }

  get board() {
    return this.minesweeperService.board;
  }

  get remainingMines() {
    return this.minesweeperService.remainingMines;
  }

  get settings() {
    return this.minesweeperService.settings;
  }
}
