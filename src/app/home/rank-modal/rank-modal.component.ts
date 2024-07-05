import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle, IonContent,
  IonFab,
  IonFabButton, IonHeader,
  IonIcon, IonTitle, IonToolbar
} from "@ionic/angular/standalone";
import {PointsService} from "../../services/points.service";
import {NgOptimizedImage} from "@angular/common";
import {ToastService} from "../../services/toast.service";
import {ToastComponent} from "../../toast/toast.component";

@Component({
  selector: 'app-rank-modal',
  templateUrl: './rank-modal.component.html',
  styleUrls: ['./rank-modal.component.scss'],
  standalone: true,
  imports: [IonFab, IonFabButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, NgOptimizedImage, ToastComponent],
})
export class RankModalComponent  implements OnInit {
  progress!: number;
  currentLevelImage!: string;
  playerPoints!: number;
  highScore!: number;
  currentLevel!: number;

  constructor(private pointsService: PointsService, private modalCtrl: ModalController, private toastService: ToastService) {}

  ngOnInit() {
    this.updateProgress();
    this.playerPoints = this.pointsService.playerPoints;
    this.highScore = this.pointsService.highScore;
    this.currentLevel = this.pointsService.getCurrentLevel();
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  updateProgress() {
    this.progress = this.pointsService.getProgressToNextLevel();
    this.currentLevelImage = this.pointsService.getCurrentLevelImage();
  }

  addPoints() {
    const previousLevel = this.currentLevel;
    this.pointsService.addPoints(10); // Example: Add 10 points
    this.updateProgress();
    this.playerPoints = this.pointsService.playerPoints;
    this.highScore = this.pointsService.highScore;
    this.currentLevel = this.pointsService.getCurrentLevel();
    this.currentLevel = this.calculateLevel();
    if (this.currentLevel > previousLevel) {
      console.log(`Level Up! You are now at Level ${this.currentLevel}`);
      this.toastService.show("Vous venez de passer au niveau : " + this.currentLevel, "warning")
    }
  }

  calculateLevel(): number {
    return Math.floor(this.playerPoints / 100) + 1;
  }

  resetPoints() {
    this.pointsService.resetPoints();
    this.updateProgress();
    this.playerPoints = this.pointsService.playerPoints;
    this.currentLevel = this.pointsService.getCurrentLevel();
  }
}
