import { Component, OnInit } from '@angular/core';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle, IonContent,
  IonFab,
  IonFabButton, IonHeader,
  IonIcon, IonTitle, IonToolbar
} from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';



@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss'],
  standalone: true,
  imports: [IonFab, IonFabButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonContent, IonHeader, IonToolbar, IonTitle],
})
export class SettingsModalComponent  implements OnInit {

  constructor(private modalCtrl: ModalController) {}

  closeModal() {
    this.modalCtrl.dismiss();
  }


  ngOnInit() {}

}

