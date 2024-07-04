import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab, IonFabButton,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {pipe} from "rxjs";
import {ModalController, NavController} from "@ionic/angular";
import {addIcons} from "ionicons";
import {
  alertCircleOutline,
  arrowBackCircleOutline,
  closeCircleOutline,
  happyOutline,
  helpCircleOutline, skullOutline
} from "ionicons/icons";
import {DidactModalComponent} from "../didact-modal/didact-modal.component";
import {ToastComponent} from "../toast/toast.component";
import {ToastService} from "../services/toast.service";
import {PointsService} from "../services/points.service";

@Component({
  selector: 'app-flappy',
  templateUrl: './flappy.page.html',
  styleUrls: ['./flappy.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButton, IonButtons, IonIcon, IonFab, IonFabButton, ToastComponent]
})
export class FlappyPage implements OnInit {

  birdY = 200;
  birdVelocity = 0;
  gravity = 0.5;
  jumpStrength = -10;
  pipes: { x: number; height: number; y: number }[] = [];
  pipeWidth = 60;
  pipeGap = 200;
  pipeSpeed = 2;
  score = 0;
  gameInterval: any;
  pipeInterval: any;
  isGameRunning = false;

  // Bird image and hitbox dimensions
  birdWidth = 40;
  birdHeight = 40;
  hitboxOffsetX = 10;
  hitboxOffsetY = 10;
  hitboxWidth = 20;
  hitboxHeight = 20;

  previousScore = 0;

  constructor(private navCtrl: NavController, private modalController: ModalController, private toastService: ToastService, private pointsService: PointsService) {
    addIcons({
      'close-circle-outline' : closeCircleOutline,
      'help-circle-outline' : helpCircleOutline,
      'arrow-back-circle-outline' : arrowBackCircleOutline,
    });
  }

  ngOnInit() {
    this.resetGame();
  }

  goBack() {
    this.navCtrl.back();
    this.resetGame();
  }


  startGame() {
    this.resetGame();
    this.isGameRunning = true;
    this.score += 1;
    this.gameInterval = setInterval(() => this.updateGame(), 20);
    this.pipeInterval = setInterval(() => this.addPipe(), 2000);
  }

  resetGame() {
    this.birdY = 200;
    this.birdVelocity = 0;
    this.pipes = [];
    this.score = 0;
    this.isGameRunning = false;
    clearInterval(this.gameInterval);
    clearInterval(this.pipeInterval);
  }

  updateGame() {
    this.birdVelocity += this.gravity;
    this.birdY += this.birdVelocity;

    if (this.birdY > 80 * window.innerHeight / 100 || this.birdY < 0) {
      this.endGame();
    }

    this.pipes.forEach(pipe => {
      pipe.x -= this.pipeSpeed;
      if (pipe.x + this.pipeWidth < 0) {
        this.score++;
        this.pipes.shift();
      }

      if (this.checkCollision(pipe)) {
        this.endGame();
      }

      if (this.score - this.previousScore > 3) {
        this.pointsService.addPoints(10);
        this.toastService.show("Points ont été ajoutées", 'success', 10);
        this.previousScore = this.score; // Mettre à jour le score précédent
      }
    });
  }

  addPipe() {
    const pipeHeight = Math.floor(Math.random() * (400 - 100 + 1)) + 100;
    this.pipes.push({ x: window.innerWidth, height: pipeHeight, y: 0 });
    this.pipes.push({ x: window.innerWidth, height: 100 * window.innerHeight / 100 - pipeHeight - this.pipeGap, y: pipeHeight + this.pipeGap });
  }

  checkCollision(pipe: { x: number; height: number; y: number }): boolean {
    const birdRect = {
      top: this.birdY + this.hitboxOffsetY,
      bottom: this.birdY + this.hitboxOffsetY + this.hitboxHeight,
      left: 50 + this.hitboxOffsetX,
      right: 50 + this.hitboxOffsetX + this.hitboxWidth
    };
    const pipeRect = { top: pipe.y, bottom: pipe.y + pipe.height, left: pipe.x, right: pipe.x + this.pipeWidth };

    return birdRect.right > pipeRect.left && birdRect.left < pipeRect.right && birdRect.bottom > pipeRect.top && birdRect.top < pipeRect.bottom;
  }

  flap() {
    this.birdVelocity = this.jumpStrength;
  }

  endGame() {
    this.isGameRunning = false;
    clearInterval(this.gameInterval);
    clearInterval(this.pipeInterval);
  }

  async openDidactModal() {
    const modal = await this.modalController.create({
      component: DidactModalComponent,
      componentProps: {
        gameName: 'flappy-bird'
      }
    });
    modal.present();
  }

  handleClick() {
    if (!this.isGameRunning) {
      this.startGame();
    } else {
      this.flap();
    }
  }
}
