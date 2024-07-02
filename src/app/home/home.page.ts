import {Component, OnInit} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
} from '@ionic/angular/standalone';
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {SettingsModalComponent} from "../settings-modal/settings-modal.component";
import { ModalController } from '@ionic/angular';
import {addIcons} from "ionicons";
import {closeCircleOutline, settingsOutline} from "ionicons/icons";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonIcon, NgOptimizedImage, NgForOf],
})
export class HomePage implements OnInit {
  currentSlide = 0;
  slides = [
    { img: 'assets/img/slide1.jpg', title: 'Slide 1' },
    { img: 'assets/img/slide2.jpg', title: 'Slide 2' },
    { img: 'assets/img/slide3.jpg', title: 'Slide 3' },
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
    }, 3000);
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }
}
