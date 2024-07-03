import {Component, OnInit} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon, IonRouterLink, IonButton,
} from '@ionic/angular/standalone';
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";
import {SettingsModalComponent} from "../settings-modal/settings-modal.component";
import { ModalController } from '@ionic/angular';
import {addIcons} from "ionicons";
import {closeCircleOutline, settingsOutline} from "ionicons/icons";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, NgOptimizedImage, NgForOf, IonRouterLink, IonButton, RouterLink],
})
export class HomePage implements OnInit {
  currentSlide = 0;
  slides = [
    { img: '../../assets/morpion.avif', title: 'TIC-TAC-TOE', route: "/morpion" },
    { img: '../../assets/four-in-a-row-logo.png', title: 'FOUR-IN-A-ROW', route: "/four-in-a-row" },
    { img: '../../assets/morpion.avif', title: 'Slide 3', route: "" },
  ];
  private slideInterval: any;

  constructor(private modalController: ModalController) {
    addIcons({
      'settings-outline': settingsOutline,
      'close-circle-outline' : closeCircleOutline,
    });
  }

  ngOnInit() {
    this.startSlideShow();
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: SettingsModalComponent,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        value: 123
      }
    });
    modal.present();
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
}
