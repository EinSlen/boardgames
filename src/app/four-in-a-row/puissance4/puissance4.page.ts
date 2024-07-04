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
  IonIcon, IonFab, IonFabButton, IonButtons
} from '@ionic/angular/standalone';
import {Puissance4Service} from "../../services/puissance4Service";
import {SquareComponent} from "../square/square.component";
import {PopupService} from "../../services/popup.service";
import {GameboardComponent} from "../gameboard/gameboard.component";
import {LoaderComponent} from "../../loader/loader.component";
import {DidactModalComponent} from "../../didact-modal/didact-modal.component";
import {ModalController, NavController} from "@ionic/angular";
import {addIcons} from "ionicons";
import {
  closeCircleOutline,
  helpCircleOutline,
  arrowBackCircleOutline,
  trendingDownOutline,
  removeOutline,
  trendingUpOutline,
  happyOutline, alertCircleOutline, skullOutline
} from "ionicons/icons";
import {ToastComponent} from "../../toast/toast.component";

@Component({
  selector: 'app-puissance4',
  templateUrl: './puissance4.page.html',
  styleUrls: ['./puissance4.page.scss'],
  standalone: true,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, LoaderComponent, IonGrid, IonRow, IonCol, SquareComponent, IonButton, IonIcon, GameboardComponent, IonFab, IonFabButton, IonButtons, ToastComponent]
})
export class Puissance4Page implements OnInit {
  isLoading: boolean = true;
  start_play: string = 'player';
  selectedDifficulty: string = 'facile';
  difficulties: { label: string; value: string; icon: string, color: string }[] = [
    { label: 'Facile', value: 'facile', icon: 'beer', color: 'success' },
    { label: 'Expert', value: 'expert', icon: 'skull', color: 'danger' },
  ];

  constructor(private popupService: PopupService, private gameService: Puissance4Service, private modalController: ModalController,  private navCtrl: NavController) {
    addIcons({
      'close-circle-outline' : closeCircleOutline,
      'help-circle-outline' : helpCircleOutline,
      'arrow-back-circle-outline' : arrowBackCircleOutline,
      'beer': happyOutline,
      'hammer': alertCircleOutline,
      'skull': skullOutline
    });
  }

  async startGame(difficulty: string) {
    let startingPlayer = "Joueur"
    startingPlayer = await this.popupService.showStartGamePopup();

    console.log('Qui commence:', startingPlayer);
    console.log('Difficulté sélectionnée:', difficulty);
    this.start_play = startingPlayer;
    this.selectedDifficulty = difficulty;

    this.gameService.startGame(startingPlayer, difficulty);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  async openDidactModal(gameName: string) {
    const modal = await this.modalController.create({
      component: DidactModalComponent,
      componentProps: {
        gameName: gameName
      }
    });
    await modal.present();
  }

  get isThinking() {
    return this.gameService.thinking;
  }

  goBack() {
    this.navCtrl.back();
  }

  get difficultyClass(): string {
    switch (this.selectedDifficulty) {
      case 'facile':
        return 'difficulty-facile';
      case 'expert':
        return 'difficulty-expert';
      default:
        return '';
    }
  }


  get currentTurn(): string {
    this.selectedDifficulty = this.gameService.getdifficulty;
    return this.selectedDifficulty != '' ? this.gameService.currentPlayer === '🔴' ? 'Joueur' : 'Ordinateur' : this.gameService.currentPlayer === '🔴' ? 'Joueur 1' : 'Joueur 2';
  }

  restartGame() {
    this.gameService.startGame('Joueur', this.selectedDifficulty);
  }

  switchToPlayerVsPlayer() {
    this.selectedDifficulty = ''
    this.gameService.startGame('Joueur 1', ''); // Exemple: Ne pas passer de difficulté pour joueur contre joueur
  }
}
