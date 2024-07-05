import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
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
import {NgForOf, NgStyle} from "@angular/common";
import {ShopService} from "../../services/shop.service";
import {ToastComponent} from "../../toast/toast.component";
import {PointsService} from "../../services/points.service";

@Component({
  selector: 'app-shop-modal',
  templateUrl: './shop-modal.component.html',
  styleUrls: ['./shop-modal.component.scss'],
  standalone: true,
  imports: [IonFab, IonFabButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonSelect, IonSelectOption, IonGrid, IonCol, IonRow, NgForOf, IonLabel, NgStyle, ToastComponent],
})
export class ShopModalComponent  implements OnInit {

  constructor(private modalCtrl: ModalController, private shopService: ShopService, private pointsService: PointsService) {
  }

  shopTTTsymbols = this.shopService.shopTTTsymbols;
  shopTTTprices = this.shopService.shopTTTprices;

  shopTTTbgcolors = this.shopService.shopTTTbgcolors;
  shopTTTbgcolorsPrices = this.shopService.shopTTTbgcolorsPrices;

  shopTTTbgskins = this.shopService.shopTTTbgskins;
  shopTTTbgskinsPrices = this.shopService.shopTTTbgskinsPrices;

  shopP4symbols = this.shopService.shopP4symbols;
  shopP4prices = this.shopService.shopP4prices;

  playerPoints: number = this.pointsService.playerPoints;

    ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

  selectTTTSymbol(i: number) {
    this.shopService.selectTTTSymbol(i);
  }

  selectTTTbgcolor(i: number) {
    this.shopService.selectTTTbgcolor(i);
  }

  selectTTTbgskin(i: number) {
    this.shopService.selectTTTbgskin(i);
  }

  selectP4Symbol(i: number) {
    this.shopService.selectP4Symbol(i);
  }
}
