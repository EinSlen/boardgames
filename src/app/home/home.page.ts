import {Component, OnInit} from '@angular/core';
import {IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonButton, IonFabButton, IonIcon} from '@ionic/angular/standalone';
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton, IonButton, IonIcon, NgOptimizedImage, NgForOf, RouterLink],
})
export class HomePage implements OnInit {
  currentSlide = 0;
  slides = [
    { img: '../../assets/morpion.avif', title: 'TIC-TAC-TOE', route: "/morpion" },
    { img: 'assets/img/slide2.jpg', title: 'Slide 2', route: "" },
    { img: 'assets/img/slide3.jpg', title: 'Slide 3', route: "" },
  ];
  private slideInterval: any;

  constructor() {}

  ngOnInit() {
    this.startSlideShow();
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
    setTimeout(() => {
      this.startSlideShow();
    }, 5000);
  }
}
