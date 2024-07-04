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
import {Puissance4Service} from "../../services/puissance4Service";

@Component({
  selector: 'app-shop-modal',
  templateUrl: './shop-modal.component.html',
  styleUrls: ['./shop-modal.component.scss'],
  standalone: true,
  imports: [IonFab, IonFabButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonSelect, IonSelectOption, IonGrid, IonCol, IonRow, NgForOf, IonLabel],
})
export class ShopModalComponent  implements OnInit {
  shopTTTsymbols = ['X','$','§','?'];
  shopTTTprices = [0, 10, 20, 30];
  TTTsymbol: string;
  TTTkey = 'TTTsymbol';
  shopP4symbols = ['🔴','❤️','💜','🎱'];
  shopP4prices = [0, 10, 20, 30];
  P4symbol: string;
  P4key = 'P4symbol';

  constructor(private modalCtrl: ModalController, private pointsService: PointsService, private puissance4Service: Puissance4Service) {
    this.TTTsymbol = this.shopTTTsymbols[0];
    this.P4symbol = this.shopP4symbols[0];
  }

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

  selectTTTSymbol(index: number) {
    if (this.pointsService.playerPoints < this.shopTTTprices[index]) {
      console.log('not enough points')
      return;
    } else {
      console.log('NEW SYMBOL', this.shopTTTsymbols[index])
      this.pointsService.removePoints(this.shopTTTprices[index]);
      this.TTTsymbol = this.shopTTTsymbols[index];
      this.setTTTsymbol(this.TTTsymbol)
    }
  }

  selectP4Symbol(index: number) {
    if (this.pointsService.playerPoints < this.shopP4prices[index]) {
      console.log('not enough points')
      return;
    } else {
      console.log('NEW SYMBOL', this.shopP4symbols[index])
      this.pointsService.removePoints(this.shopP4prices[index]);
      this.P4symbol = this.shopP4symbols[index];
      this.setP4symbol(this.P4symbol)
    }
  }

  getTTTsymbol(){
    return localStorage.getItem(this.TTTkey) || this.TTTsymbol;
  }

  getP4symbol(){
    return localStorage.getItem(this.P4key) || this.P4symbol;
  }

  setTTTsymbol(symbol: string){
    localStorage.setItem(this.TTTkey, symbol);
  }

  setP4symbol(symbol: string){
    localStorage.setItem(this.P4key, symbol);
    this.puissance4Service.setHumanPlayer = symbol;
  }
}
