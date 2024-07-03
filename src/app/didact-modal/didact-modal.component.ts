import { Component, OnInit } from '@angular/core';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle, IonCol, IonContent,
  IonFab,
  IonFabButton, IonGrid, IonHeader,
  IonIcon, IonRow, IonTitle, IonToolbar
} from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-didact-modal',
  templateUrl: './didact-modal.component.html',
  styleUrls: ['./didact-modal.component.scss'],
  standalone: true,
  imports: [IonFab, IonFabButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonContent, IonHeader, IonToolbar, IonTitle, IonRow, IonCol, IonGrid],
})
export class DidactModalComponent  implements OnInit {

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  closeDidactModal() {
    this.modalCtrl.dismiss();
  }
}
