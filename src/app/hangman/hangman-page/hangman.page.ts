import {Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon, IonRow, IonText,
  IonTitle,
  IonToolbar, Platform
} from '@ionic/angular/standalone';
import {NavController} from "@ionic/angular";
import {addIcons} from "ionicons";
import {arrowBackCircleOutline, closeCircleOutline, helpCircleOutline} from "ionicons/icons";
import {HangmanGameService} from "../../services/hangmanGame.service";

@Component({
  selector: 'app-hangman-page',
  templateUrl: './hangman.page.html',
  styleUrls: ['./hangman.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonButtons, IonIcon, IonGrid, IonRow, IonText]
})
export class HangmanPage {
  constructor(private navCtrl : NavController, protected service : HangmanGameService, private platform : Platform) {
    addIcons({
      'close-circle-outline' : closeCircleOutline,
      'help-circle-outline' : helpCircleOutline,
      'arrow-back-circle-outline' : arrowBackCircleOutline
    })
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
