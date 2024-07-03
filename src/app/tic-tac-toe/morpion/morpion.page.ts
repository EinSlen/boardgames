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
    IonIcon, IonFab, IonFabButton
} from '@ionic/angular/standalone';
import {GameService} from "../../services/gameService";
import {SquareComponent} from "../square/square.component";
import {PopupService} from "../../services/popup.service";
import {GameboardComponent} from "../gameboard/gameboard.component";
import {LoaderComponent} from "../../loader/loader.component";
import {SettingsModalComponent} from "../../settings-modal/settings-modal.component";
import {DidactModalComponent} from "../../didact-modal/didact-modal.component";
import {ModalController} from "@ionic/angular";
import {addIcons} from "ionicons";
import {closeCircleOutline, helpCircleOutline, settingsOutline} from "ionicons/icons";

@Component({
  selector: 'app-morpion',
  templateUrl: './morpion.page.html',
  styleUrls: ['./morpion.page.scss'],
  standalone: true,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, LoaderComponent, IonGrid, IonRow, IonCol, SquareComponent, IonButton, IonIcon, GameboardComponent, IonFab, IonFabButton]
})
export class MorpionPage implements OnInit {
  isLoading = true;

  constructor(private popupService: PopupService, private gameService: GameService, private modalController: ModalController) {
    addIcons({
      'close-circle-outline' : closeCircleOutline,
      'help-circle-outline' : helpCircleOutline,
    });
  }


  async startGame(difficulty: string) {
    const startingPlayer = await this.popupService.showStartGamePopup();

    // Démarrer le jeu avec le joueur ou l'ordinateur en fonction de 'startingPlayer' et de la difficulté sélectionnée
    console.log('Qui commence:', startingPlayer);
    console.log('Difficulté sélectionnée:', difficulty);

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
}
