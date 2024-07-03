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
import {GameService} from "../../services/gameService";
import {SquareComponent} from "../square/square.component";
import {PopupService} from "../../services/popup.service";
import {GameboardComponent} from "../gameboard/gameboard.component";
import {LoaderComponent} from "../../loader/loader.component";
import {SettingsModalComponent} from "../../settings-modal/settings-modal.component";
import {DidactModalComponent} from "../../didact-modal/didact-modal.component";
import {ModalController, NavController} from "@ionic/angular";
import {addIcons} from "ionicons";
import {closeCircleOutline, helpCircleOutline, settingsOutline, arrowBackCircleOutline, trendingDownOutline, removeOutline, trendingUpOutline} from "ionicons/icons";

@Component({
  selector: 'app-morpion',
  templateUrl: './morpion.page.html',
  styleUrls: ['./morpion.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, LoaderComponent, IonGrid, IonRow, IonCol, SquareComponent, IonButton, IonIcon, GameboardComponent, IonFab, IonFabButton, IonButtons]
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

  constructor(private popupService: PopupService, private gameService: GameService, private modalController: ModalController,  private navCtrl: NavController) {
    addIcons({
      'close-circle-outline' : closeCircleOutline,
      'help-circle-outline' : helpCircleOutline,
      'arrow-back-circle-outline' : arrowBackCircleOutline,
      'beer': trendingDownOutline,
      'hammer': removeOutline,
      'skull': trendingUpOutline
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
    }, 3000);
  }

  async openDidactModal() {
    const modal = await this.modalController.create({
      component: DidactModalComponent,
      componentProps: {
        value: 123
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

  get difficultyClass(): string {
    switch (this.selectedDifficulty) {
      case 'facile':
        return 'difficulty-facile';
      case 'medium':
        return 'difficulty-medium';
      case 'expert':
        return 'difficulty-expert';
      default:
        return '';
    }
  }

  get currentTurn(): string {
    return this.gameService.currentPlayer === 'X' ? 'Joueur' : 'Ordinateur';
  }
}
