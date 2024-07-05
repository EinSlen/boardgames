import { Component, OnInit } from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle, IonContent,
  IonFab,
  IonFabButton, IonHeader,
  IonIcon, IonTitle, IonToolbar
} from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';
import {PointsService} from "../../services/points.service";
import {ShopService} from "../../services/shop.service";



@Component({
  selector: 'app-settings-modal',
  templateUrl: './settings-modal.component.html',
  styleUrls: ['./settings-modal.component.scss'],
  standalone: true,
  imports: [IonFab, IonFabButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonContent, IonHeader, IonToolbar, IonTitle, IonButton],
})
export class SettingsModalComponent  implements OnInit {

  constructor(private modalCtrl: ModalController, private pointsService: PointsService, private shopService: ShopService) {}

  closeModal() {
    this.modalCtrl.dismiss();
  }


  ngOnInit() {}

  resetPoints() {
    this.pointsService.resetPoints();
  }

  resetAll() {
    this.pointsService.resetPoints();
    this.pointsService.resetHighScore();
    this.shopService.resetData();
  }
}

