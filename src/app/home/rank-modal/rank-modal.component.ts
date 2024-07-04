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

@Component({
  selector: 'app-rank-modal',
  templateUrl: './rank-modal.component.html',
  styleUrls: ['./rank-modal.component.scss'],
  standalone: true,
  imports: [IonFab, IonFabButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, NgOptimizedImage],
})
export class RankModalComponent  implements OnInit {
  progress!: number;
  currentLevelImage!: string;
  playerPoints!: number;
  highScore!: number;
  currentLevel!: number;

  constructor(private pointsService: PointsService, private modalCtrl: ModalController) {}

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
    this.pointsService.addPoints(10); // Example: Add 10 points
    this.updateProgress();
    this.playerPoints = this.pointsService.playerPoints;
    this.highScore = this.pointsService.highScore;
    this.currentLevel = this.pointsService.getCurrentLevel();
  }

  resetPoints() {
    this.pointsService.resetPoints();
    this.updateProgress();
    this.playerPoints = this.pointsService.playerPoints;
    this.currentLevel = this.pointsService.getCurrentLevel();
  }
}
