import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
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
  IonToolbar
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
export class HangmanPage implements OnInit {
  @ViewChildren('smallButtons', { read: ElementRef }) ionButtons!: QueryList<ElementRef>;
  constructor(private navCtrl : NavController, protected service : HangmanGameService) {
    addIcons({
      'close-circle-outline' : closeCircleOutline,
      'help-circle-outline' : helpCircleOutline,
      'arrow-back-circle-outline' : arrowBackCircleOutline
    })
  }

  ngOnInit() {

  }



  restartGame(){
    const buttons = document.querySelectorAll(".small-button")
    buttons.forEach((btn) => {
      btn.classList.add("danger")
    })
    this.service = new HangmanGameService();
  }

  goBack(){
    this.navCtrl.back();
  }

}
