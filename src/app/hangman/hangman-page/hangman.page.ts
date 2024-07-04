import {Component, OnInit} from '@angular/core';
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
import {AlertController, ModalController, NavController} from "@ionic/angular";
import {addIcons} from "ionicons";
import {alert, arrowBackCircleOutline, closeCircleOutline, helpCircleOutline} from "ionicons/icons";
import {HangmanGameService} from "../../services/hangmanGame.service";
import {DidactModalComponent} from "../../didact-modal/didact-modal.component";
import {PopupService} from "../../services/popup.service";
import {PointsService} from "../../services/points.service";
import {ToastComponent} from "../../toast/toast.component";
import {ToastService} from "../../services/toast.service";

@Component({
  selector: 'app-hangman-page',
  templateUrl: './hangman.page.html',
  styleUrls: ['./hangman.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonButtons, IonIcon, IonGrid, IonRow, IonText, IonFab, IonFabButton, ToastComponent]
})
export class HangmanPage implements OnInit{
  constructor(private modalController : ModalController,private pointsService : PointsService,private popupService : PopupService,private alertController: AlertController,private navCtrl : NavController, protected service : HangmanGameService, private platform : Platform, private toastService: ToastService) {
    addIcons({
      'close-circle-outline' : closeCircleOutline,
      'help-circle-outline' : helpCircleOutline,
      'arrow-back-circle-outline' : arrowBackCircleOutline,
    })
  }

  ngOnInit(): void {
    this.restartGame()
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

  checkClickedButton(event : any){
    this.service.checkClickedButton(event)
    if (this.service.checkWordFound()){
      this.generatePopUpWin()
    }
    else if (this.service.tries <= 0){
      this.generatePopUpLoose()
    }
  }

  async generatePopUpWin(){
    const alert = await this.alertController.create({
      header: "Bien joué !",
      message: "Vous avez trouvé le mot caché !",
      buttons: [
        {
          text: 'Recommencer',
          handler: () => {
            this.restartGame()
          }
        }
      ]
    })
    this.pointsService.addPoints(10);
    this.toastService.show("10 Points ont été ajoutées", 'success');
    await alert.present();
    this.popupService.launchConfetti()
  }

  async generatePopUpLoose() {
    const alert = await this.alertController.create({
      header: "Dommage !",
      message: "Vous avez perdu ! Le mot à trouver était "+this.service.word +" !",
      buttons: [
        {
          text: 'Recommencer',
          handler: () => {
            this.restartGame()
          }
        }
      ]
    })
    await alert.present();
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
