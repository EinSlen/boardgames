import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle, IonContent,
  IonFab,
  IonFabButton, IonHeader,
  IonIcon, IonTitle, IonToolbar
} from "@ionic/angular/standalone";

@Component({
  selector: 'app-rank-modal',
  templateUrl: './rank-modal.component.html',
  styleUrls: ['./rank-modal.component.scss'],
  standalone: true,
  imports: [IonFab, IonFabButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonContent, IonHeader, IonToolbar, IonTitle, IonButton],
})
export class RankModalComponent  implements OnInit {

  constructor(private modalCtrl: ModalController,) { }

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

}
