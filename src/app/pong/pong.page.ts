import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton, IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';
import {LoaderComponent} from "../loader/loader.component";
import {DidactModalComponent} from "../didact-modal/didact-modal.component";
import {ModalController, NavController} from "@ionic/angular";
import {addIcons} from "ionicons";
import {
  alertCircleOutline,
  arrowBackCircleOutline,
  closeCircleOutline,
  happyOutline,
  helpCircleOutline, skullOutline
} from "ionicons/icons";
import * as confetti from "canvas-confetti";
import {PopupService} from "../services/popup.service";
import {ToastComponent} from "../toast/toast.component";

@Component({
  selector: 'app-pong',
  templateUrl: './pong.page.html',
  styleUrls: ['./pong.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, LoaderComponent, IonButton, IonFab, IonFabButton, IonIcon, IonButtons, ToastComponent]
})
export class PongPage implements AfterViewInit {
  ball: HTMLElement | null = null;
  playerPaddle: HTMLElement | null = null;
  aiPaddle: HTMLElement | null = null;
  container: HTMLElement | null = null;
  playerScoreElement: HTMLElement | null = null;
  aiScoreElement: HTMLElement | null = null;

  ballX = 50;
  ballY = 50;
  ballDX = 2;
  ballDY = 2;
  ballSize = 20;

  playerPaddleX = 50;
  playerPaddleWidth = 100;
  playerPaddleHeight = 20;

  aiPaddleX = 50;
  aiPaddleWidth = 100;
  aiPaddleHeight = 20;

  playerScore = 0;
  aiScore = 0;

  intervalId: any;

  countdown = 0;
  countdownIntervalId: any;
  countdownClass = 'countdown-green';

  speed = 0.01;

  gameStarted = false; // Nouvelle propriété pour suivre l'état du jeu

  constructor(private modalController: ModalController, private popupService: PopupService, private navCtrl: NavController) {
    addIcons({
      'close-circle-outline': closeCircleOutline,
      'help-circle-outline': helpCircleOutline,
      'arrow-back-circle-outline' : arrowBackCircleOutline,
    });
  }

  ngAfterViewInit() {
    this.countdown = -1;
    this.ball = document.querySelector('.ball');
    this.playerPaddle = document.querySelector('.paddle.player');
    this.aiPaddle = document.querySelector('.paddle.ai');
    this.container = document.querySelector('.game-container');
    this.playerScoreElement = document.querySelector('.player-score');
    this.aiScoreElement = document.querySelector('.ai-score');

    if (this.ball && this.playerPaddle && this.aiPaddle && this.container) {
      this.setupMouseControls();
    }
  }

  async openDidactModal() {
    const modal = await this.modalController.create({
      component: DidactModalComponent,
      componentProps: {
        gameName: 'pong',
      },
    });
    modal.present();
  }

  startCountdown() {
    this.gameStarted = true; // Marquer que le jeu a démarré
    this.countdown = 3;
    this.countdownClass = 'countdown-green';
    this.countdownIntervalId = setInterval(() => {
      this.countdown--;
      if (this.countdown === 2) {
        this.countdownClass = 'countdown-orange';
      } else if (this.countdown === 1) {
        this.countdownClass = 'countdown-red';
      } else if (this.countdown === 0) {
        this.countdownClass = '';
        clearInterval(this.countdownIntervalId);
        this.startGame();
        setTimeout(() => {
          this.countdownClass = '';
          this.countdown--;
        }, 500);
      }
    }, 1000);
  }

  stopGame() {
    if(this.countdown < 0) {
      this.gameStarted = false; // Marquer que le jeu est arrêté
      clearInterval(this.intervalId); // Arrêter l'intervalle de mise à jour du jeu si nécessaire
      // Réinitialiser le jeu si nécessaire...
    }
  }

  startGame() {
    this.resetBall();
    this.speed = 0.01;
    this.aiScore = 0;
    this.playerScore = 0;
    if(this.playerScoreElement) {
      this.playerScoreElement.textContent = '0';
    }
    if(this.aiScoreElement) {
      this.aiScoreElement.textContent = '0';
    }
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.intervalId = setInterval(() => {
      this.update();
      this.checkWin();
    }, 10);
  }

  goBack() {
    this.navCtrl.back();
    this.stopGame();
  }

  checkWin() {
    const maxScore = 2; // Score maximum pour gagner
    if (this.playerScore >= maxScore || this.aiScore >= maxScore) {
      clearInterval(this.intervalId);
      this.gameStarted = false; // Arrêter le jeu lorsque quelqu'un gagne
    }
    if (this.playerScore >= maxScore) {
      this.showGameOverModal('player');
    } else if (this.aiScore >= maxScore) {
      this.showGameOverModal('computer');
    }
  }

  update() {
    if (!this.ball || !this.playerPaddle || !this.aiPaddle || !this.container) return;

    this.ballX += this.ballDX;
    this.ballY += this.ballDY;

    // Collision with player's paddle
    const playerPaddleTop = this.container.clientHeight - this.playerPaddleHeight;
    if (
      this.ballY + this.ballSize >= playerPaddleTop &&
      this.ballX + this.ballSize >= this.playerPaddleX &&
      this.ballX <= this.playerPaddleX + this.playerPaddleWidth
    ) {
      this.ballDY = -this.ballDY;
      this.ballY = playerPaddleTop - this.ballSize; // Avoid sticking to the paddle
    }

    // Collision with AI's paddle
    const aiPaddleBottom = this.aiPaddleHeight;
    if (
      this.ballY <= aiPaddleBottom &&
      this.ballX + this.ballSize >= this.aiPaddleX &&
      this.ballX <= this.aiPaddleX + this.aiPaddleWidth
    ) {
      this.ballDY = -this.ballDY;
      this.ballY = aiPaddleBottom; // Avoid sticking to the paddle
    }

    // Collision with walls
    if (this.ballX <= 0 || this.ballX + this.ballSize >= this.container.clientWidth) {
      this.ballDX = -this.ballDX;
    }

    // Check if the ball goes out of bounds
    if (this.ballY + this.ballSize >= this.container.clientHeight) {
      this.aiScore++;
      this.updateScore();
      this.resetBall();
    } else if (this.ballY <= 0) {
      this.playerScore++;
      this.updateScore();
      this.resetBall();
    }

    // Update AI paddle position (simple AI)
    if (this.ballX > this.aiPaddleX + this.aiPaddleWidth / 2) {
      this.aiPaddleX += 2;
    } else if (this.ballX < this.aiPaddleX + this.aiPaddleWidth / 2) {
      this.aiPaddleX -= 2;
    }

    // Ensure AI paddle stays within bounds
    this.aiPaddleX = Math.max(Math.min(this.aiPaddleX, this.container.clientWidth - this.aiPaddleWidth), 0);

    // Update ball and paddles positions
    this.ball.style.left = `${this.ballX}px`;
    this.ball.style.top = `${this.ballY}px`;
    this.playerPaddle.style.left = `${this.playerPaddleX}px`;
    this.aiPaddle.style.left = `${this.aiPaddleX}px`;
  }

  resetBall() {
    if (!this.container) return;

    this.ballX = this.container.clientWidth / 2 - this.ballSize / 2;
    this.ballY = this.container.clientHeight / 2 - this.ballSize / 2;
    this.ballDX = (Math.random() > 0.5 ? 1 : -1) * Math.abs(this.ballDX);
    this.ballDY = (Math.random() > 0.5 ? 1 : -1) * Math.abs(this.ballDY);
  }

  setupMouseControls() {
    document.addEventListener('mousemove', (event) => {
      if (!this.container) return;

      const containerRect = this.container.getBoundingClientRect();
      const mouseX = event.clientX - containerRect.left;

      this.playerPaddleX = Math.min(
        Math.max(mouseX - this.playerPaddleWidth / 2, 0),
        this.container.clientWidth - this.playerPaddleWidth
      );

      if (this.playerPaddle) {
        this.playerPaddle.style.left = `${this.playerPaddleX}px`;
      }
    });

    document.addEventListener('touchmove', (event) => {
      event.preventDefault(); // Empêche le défilement par défaut sur l'écran tactile

      if (!this.container) return;

      const containerRect = this.container.getBoundingClientRect();
      const touchX = event.touches[0].clientX - containerRect.left;

      this.playerPaddleX = Math.min(
        Math.max(touchX - this.playerPaddleWidth / 2, 0),
        this.container.clientWidth - this.playerPaddleWidth
      );

      if (this.playerPaddle) {
        this.playerPaddle.style.left = `${this.playerPaddleX}px`;
      }
    });
  }

  updateScore() {
    this.speed += this.speed;
    if (this.playerScoreElement) {
      this.playerScoreElement.textContent = this.playerScore.toString();
    }
    if (this.aiScoreElement) {
      this.aiScoreElement.textContent = this.aiScore.toString();
    }
  }

  private showGameOverModal(player: string) {
    console.log('Game Over. ' + player + ' wins!');
    this.popupService.showGameResultPong(player, () => {
      this.startCountdown();
      this.aiScore = 0;
      this.playerScore = 0;
    })
  }
}
