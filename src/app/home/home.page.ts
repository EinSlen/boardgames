import {Component, OnInit} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon, IonRouterLink, IonButton, IonLabel, IonGrid, IonCol, IonRow,
} from '@ionic/angular/standalone';
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {SettingsModalComponent} from "./settings-modal/settings-modal.component";
import { ModalController } from '@ionic/angular';
import {addIcons} from "ionicons";
import {cartOutline, closeCircleOutline, settingsOutline, shieldHalfOutline, shieldOutline} from "ionicons/icons";
import {PointsService} from "../services/points.service";
import {ShopModalComponent} from "./shop-modal/shop-modal.component";
import {RankModalComponent} from "./rank-modal/rank-modal.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, NgOptimizedImage, NgForOf, IonRouterLink, IonButton, RouterLink, IonLabel, IonGrid, IonCol, IonRow],
})
export class HomePage implements OnInit {
  currentSlide = 0;
  slides = [
    { img: '../../assets/morpion.avif', title: 'TIC-TAC-TOE', route: "/morpion" },
    { img: '../../assets/OIP.jpg', title: 'PONG GAME', route: "/pong" },
    { img: '../../assets/four-in-a-row-logo.png', title: 'Puissance 4', route: "/puissance4" },
    { img: '../../assets/minesweeper-logo.png', title: 'Démineur', route: "/demineur" },
    { img: '../../assets/hangman-icon/image-penduGame-9.svg', title: 'Jeu du pendu', route: "/hangman-page" },

  ];
  private slideInterval: any;

  constructor(private modalController: ModalController, private pointsService: PointsService) {
    addIcons({
      'settings-outline': settingsOutline,
      'close-circle-outline' : closeCircleOutline,
      'cart-outline': cartOutline,
      'shield-outline': shieldHalfOutline
    });
  }

  ngOnInit() {
    this.startSlideShow();
  }

  async openModal(modalName: string) {
    let modal;
    switch (modalName) {
      case 'settings':
        modal = await this.modalController.create({
          component: SettingsModalComponent,
          cssClass: 'settings-modal',
        });
        break;
      case 'shop':
        modal = await this.modalController.create({
          component: ShopModalComponent,
          cssClass: 'shop-modal',
        });
        break;
      case 'rank':
        modal = await this.modalController.create({
          component: RankModalComponent,
        });
        break;
    }

    if (modal){
      modal.present();
    }
  }

  startSlideShow() {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  stopSlideShow() {
    clearInterval(this.slideInterval);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.resetSlideShow();
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.resetSlideShow();
  }

  resetSlideShow() {
    this.stopSlideShow();
    this.startSlideShow();
  }

  get playerPoints(): number {
    return this.pointsService.getPoints();
  }
}
