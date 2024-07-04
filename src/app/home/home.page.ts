import {Component, OnInit,  CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonRouterLink,
  IonButton,
  IonLabel,
  IonGrid,
  IonCol,
  IonRow,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/angular/standalone';
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {SettingsModalComponent} from "./settings-modal/settings-modal.component";
import { ModalController } from '@ionic/angular';
import {addIcons} from "ionicons";
import {cartOutline, closeCircleOutline, settingsOutline} from "ionicons/icons";
import {PointsService} from "../services/points.service";
import {ShopModalComponent} from "./shop-modal/shop-modal.component";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, NgOptimizedImage, NgForOf, IonRouterLink, IonButton, RouterLink, IonLabel, IonGrid, IonCol, IonRow, IonCard, IonCardContent, IonCardHeader, IonCardTitle],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class HomePage implements OnInit {
  currentSlide = 0;
  slides = [
    { img: '../../assets/morpion.avif', title: 'TIC-TAC-TOE', route: '/morpion' },
    { img: '../../assets/OIP.jpg', title: 'PONG GAME', route: '/pong' },
    { img: '../../assets/four-in-a-row-logo.png', title: 'Puissance 4', route: '/puissance4' },
    { img: '../../assets/minesweeper-logo.png', title: 'Démineur', route: '/demineur' },
    { img: '../../assets/hangman-icon/image-penduGame-9.svg', title: 'Jeu du pendu', route: '/hangman-page' },
  ];

  constructor(private modalController: ModalController, private pointsService: PointsService) {
    addIcons({
      'settings-outline': settingsOutline,
      'close-circle-outline' : closeCircleOutline,
      'cart-outline': cartOutline,
    });
  }

  ngOnInit() {}

  async openModal(modalName: string) {
    let modal;
    switch (modalName) {
      case 'settings':
        modal = await this.modalController.create({
          component: SettingsModalComponent,
        });
        break;
      case 'shop':
        modal = await this.modalController.create({
          component: ShopModalComponent,
        });
        break;
    }

    if (modal){
      modal.present();
    }
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  onSwipe(event : any) {
    if (event.direction === 2) {
      this.prevSlide();
    } else if (event.direction === 4) {
      this.nextSlide();
    }
  }

  get playerPoints(): number {
    return this.pointsService.getPoints();
  }
}
