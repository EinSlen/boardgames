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
import {TicTacToeService} from "../../services/tic-tac-toe-Service";
import {SquareComponent} from "../square/square.component";
import {PopupService} from "../../services/popup.service";
import {GameboardComponent} from "../gameboard/gameboard.component";
import {LoaderComponent} from "../../loader/loader.component";
import {DidactModalComponent} from "../../didact-modal/didact-modal.component";
import {ModalController, NavController} from "@ionic/angular";
import {addIcons} from "ionicons";
import {closeCircleOutline, helpCircleOutline, arrowBackCircleOutline, happyOutline, alertCircleOutline, skullOutline} from "ionicons/icons";
import {ToastComponent} from "../../toast/toast.component";

@Component({
  selector: 'app-morpion',
  templateUrl: './morpion.page.html',
  styleUrls: ['./morpion.page.scss'],
  standalone: true,
  providers: [TicTacToeService],
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, LoaderComponent, IonGrid, IonRow, IonCol, SquareComponent, IonButton, IonIcon, GameboardComponent, IonFab, IonFabButton, IonButtons, ToastComponent]
})
export class MorpionPage implements OnInit {
  isLoading: boolean = true;
  start_play: string = 'player';
  selectedDifficulty: string = 'facile';
  difficulties: { label: string; value: string; icon: string, color: string }[] = [
    { label: 'Facile', value: 'facile', icon: 'beer', color: 'success' },
    { label: 'Medium', value: 'medium', icon: 'hammer', color: 'warning' },
    { label: 'Expert', value: 'expert', icon: 'skull', color: 'danger' },
  ];

  constructor(private popupService: PopupService, private gameService: TicTacToeService, private modalController: ModalController, private navCtrl: NavController) {
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

    this.gameService.startGame(startingPlayer, difficulty);
    this.selectedDifficulty = this.gameService.getdifficulty;
  }

  switchToPlayerVsPlayer() {
    this.selectedDifficulty = ''
    this.gameService.startGame('Joueur 1', ''); // Exemple: Ne pas passer de difficulté pour joueur contre joueur
  }

  restartGame() {
    this.gameService.startGame('Joueur', this.selectedDifficulty);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }

  async openDidactModal() {
    const modal = await this.modalController.create({
      component: DidactModalComponent,
      componentProps: {
        gameName: 'morpion'
      }
    });
    modal.present();
  }

  get isThinking() {
    return this.gameService.thinking;
  }

  goBack() {
    this.navCtrl.back();
  }

  get currentTurn(): string {
    this.selectedDifficulty = this.gameService.getdifficulty;
    return this.selectedDifficulty != '' ? this.gameService.currentPlayer === 'X' ? 'Joueur' : 'Ordinateur' : this.gameService.currentPlayer === 'X' ? 'Joueur 1' : 'Joueur 2';
  }
}
