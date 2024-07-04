import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {PointsService} from "../../services/points.service";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle, IonCol, IonContent,
  IonFab,
  IonFabButton, IonGrid, IonHeader,
  IonIcon, IonLabel, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar
} from "@ionic/angular/standalone";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-shop-modal',
  templateUrl: './shop-modal.component.html',
  styleUrls: ['./shop-modal.component.scss'],
  standalone: true,
  imports: [IonFab, IonFabButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonSelect, IonSelectOption, IonGrid, IonCol, IonRow, NgForOf, IonLabel],
})
export class ShopModalComponent  implements OnInit {
  shopTTTsymbols = ['X','$','§','?'];
  shopTTTprices = [0, 20, 30, 50];
  TTTsymbol = this.shopTTTsymbols[0];
  shopP4symbols = ['🔴','❤️','💜','🎱'];
  shopP4prices = [0, 20, 30, 50];
  P4symbol = this.shopP4symbols[0];

  constructor(private modalCtrl: ModalController, private pointsService: PointsService) { }

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

  selectTTTSymbol(index: number) {
    if (this.pointsService.playerPoints < this.shopTTTprices[index]) {
      return;
    } else {
      this.pointsService.removePoints(this.shopTTTprices[index]);
      this.TTTsymbol = this.shopTTTsymbols[index];
    }
  }

  selectP4Symbol(index: number) {
    if (this.pointsService.playerPoints < this.shopP4prices[index]) {
      return;
    } else {
      this.pointsService.removePoints(this.shopP4prices[index]);
      this.P4symbol = this.shopP4symbols[index];
    }
  }
}
