import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent, IonFab, IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon, IonRow, IonText,
  IonTitle,
  IonToolbar, Platform
} from '@ionic/angular/standalone';
import {ModalController, NavController} from "@ionic/angular";
import {addIcons} from "ionicons";
import {arrowBackCircleOutline, closeCircleOutline, helpCircleOutline} from "ionicons/icons";
import {HangmanGameService} from "../../services/hangmanGame.service";
import {DidactModalComponent} from "../../didact-modal/didact-modal.component";

@Component({
  selector: 'app-hangman-page',
  templateUrl: './hangman.page.html',
  styleUrls: ['./hangman.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonButtons, IonIcon, IonGrid, IonRow, IonText, IonFab, IonFabButton]
})
export class HangmanPage {
  constructor(private modalController : ModalController,private navCtrl : NavController, protected service : HangmanGameService, private platform : Platform) {
    addIcons({
      'close-circle-outline' : closeCircleOutline,
      'help-circle-outline' : helpCircleOutline,
      'arrow-back-circle-outline' : arrowBackCircleOutline,
    })
  }

  async openDidactModal() {
    const modal = await this.modalController.create({
      component: DidactModalComponent,
      componentProps: {
        gameName: 'hangman'
      }
    });
    modal.present();
  }

  restartGame(){
    this.platform.ready().then(() => {
      const buttons = document.getElementsByTagName('ion-button');
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].color = "primary"
      }
    });
    this.service = new HangmanGameService();
  }

  goBack(){
    this.navCtrl.back();
  }

}
