import { Injectable } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {PointsService} from "./points.service";
import {ToastService} from "./toast.service";
import {Puissance4Service} from "./puissance4Service";

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  shopTTTsymbols = ['X','$','§','?'];
  shopTTTprices = [0, 10, 20, 30];
  TTTsymbol: string;
  TTTkey = 'TTTsymbol';

  shopTTTbgcolors: string[] = ['white', 'blue', 'green', 'yellow'];
  shopTTTbgcolorsPrices = [0, 10, 20, 30];
  TTTbgcolor: string;
  TTTbgcolorKey = 'TTTbgcolor';

  bgskinsPath = '/assets/backgrounds/';
  shopTTTbgskins: string[] = ['nothing', this.bgskinsPath+'confetti.png', this.bgskinsPath+'cartoon-fire-flame.png'];
  shopTTTbgskinsPrices = [0, 10, 20];
  TTTbgskin: string;
  TTTbgskinKey = 'TTTbgskin';

  shopP4symbols = ['🔴','❤️','💜','🎱'];
  shopP4prices = [0, 10, 20, 30];
  P4symbol: string;
  P4key = 'P4symbol';

  constructor(private pointsService: PointsService, private toastService: ToastService, private puissance4Service: Puissance4Service) {
    this.TTTsymbol = localStorage.getItem(this.TTTkey) || this.shopTTTsymbols[0];
    this.TTTbgcolor = localStorage.getItem(this.TTTbgcolorKey) || this.shopTTTbgcolors[0];
    this.TTTbgskin = localStorage.getItem(this.TTTbgskinKey) || this.shopTTTbgskins[0];
    this.P4symbol = localStorage.getItem(this.P4key) || this.shopP4symbols[0];
  }

  selectTTTSymbol(index: number) {
    if (this.pointsService.playerPoints < this.shopTTTprices[index]) {
      this.toastService.show("Points manque pour pouvoir acheter ce cosmétique", 'error', this.shopTTTprices[index]-this.pointsService.playerPoints);
      console.log('not enough points')
      return;
    } else {
      this.toastService.show("Nouveau cosmétique appliqué : " + this.shopTTTsymbols[index], 'info');
      console.log('NEW SYMBOL', this.shopTTTsymbols[index])
      this.pointsService.removePoints(this.shopTTTprices[index]);
      this.TTTsymbol = this.shopTTTsymbols[index];
      this.setTTTSymbol(this.TTTsymbol);
    }
  }

  selectTTTbgcolor(index: number) {
    if (this.pointsService.playerPoints < this.shopTTTbgcolorsPrices[index]) {
      this.toastService.show("Points manque pour pouvoir acheter ce background", 'error', this.shopTTTbgcolorsPrices[index]-this.pointsService.playerPoints);
      console.log('not enough points')
      return;
    } else {
      this.toastService.show("Nouveau background appliqué : " + this.shopTTTbgcolors[index], 'info');
      console.log('NEW BG COLOR', this.shopTTTbgcolors[index])
      this.pointsService.removePoints(this.shopTTTbgcolorsPrices[index]);
      this.TTTbgcolor = this.shopTTTbgcolors[index];
      this.setTTTbgcolor(this.TTTbgcolor);
    }
  }

  selectTTTbgskin(index: number) {
    if (this.pointsService.playerPoints < this.shopTTTbgskinsPrices[index]) {
      this.toastService.show("Points manque pour pouvoir acheter ce skin", 'error', this.shopTTTbgskinsPrices[index]-this.pointsService.playerPoints);
      console.log('not enough points')
      return;
    } else {
      this.toastService.show("Nouveau skin appliqué : " + this.shopTTTbgskins[index], 'info');
      console.log('NEW BG SKIN', this.shopTTTbgskins[index])
      this.pointsService.removePoints(this.shopTTTbgskinsPrices[index]);
      this.TTTbgskin = this.shopTTTbgskins[index];
      this.setTTTbgskin(this.TTTbgskin);
    }
  }

  selectP4Symbol(index: number) {
    if (this.pointsService.playerPoints < this.shopP4prices[index]) {
      this.toastService.show("Points manque pour pouvoir acheter ce symbol", 'error', this.shopP4prices[index]-this.pointsService.playerPoints);
      console.log('not enough points')
      return;
    } else {
      this.toastService.show("Nouveau symbol appliqué : " +  this.shopP4symbols[index], 'info');
      console.log('NEW SYMBOL', this.shopP4symbols[index])
      this.pointsService.removePoints(this.shopP4prices[index]);
      this.P4symbol = this.shopP4symbols[index];
      this.puissance4Service.setHumanPlayer = this.P4symbol;
      this.setP4Symbol(this.P4symbol);
    }
  }

  setTTTSymbol(symbol: string) {
    localStorage.setItem(this.TTTkey, symbol);
  }

  setTTTbgcolor(color: string) {
    localStorage.setItem(this.TTTbgcolorKey, color);
  }

  setTTTbgskin(skin: string) {
    localStorage.setItem(this.TTTbgskinKey, skin);
  }

  setP4Symbol(symbol: string) {
    localStorage.setItem(this.P4key, symbol);
  }

  resetData() {
    //reset le local storage
    localStorage.removeItem(this.TTTkey);
    localStorage.removeItem(this.TTTbgcolorKey);
    localStorage.removeItem(this.TTTbgskinKey);
    localStorage.removeItem(this.P4key);
    //reset les variables
    this.TTTsymbol = this.shopTTTsymbols[0];
    this.TTTbgcolor = this.shopTTTbgcolors[0];
    this.TTTbgskin = this.shopTTTbgskins[0];
    this.P4symbol = this.shopP4symbols[0];

  }
}
