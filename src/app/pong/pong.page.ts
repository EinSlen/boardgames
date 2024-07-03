import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-pong',
  templateUrl: './pong.page.html',
  styleUrls: ['./pong.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class PongPage implements AfterViewInit {
  ball: HTMLElement | null = null;
  playerPaddle: HTMLElement | null = null;
  aiPaddle: HTMLElement | null = null;
  container: HTMLElement | null = null;

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

  intervalId: any;

  ngAfterViewInit() {
    this.ball = document.querySelector('.ball');
    this.playerPaddle = document.querySelector('.paddle.player');
    this.aiPaddle = document.querySelector('.paddle.ai');
    this.container = document.querySelector('.game-container');

    if (this.ball && this.playerPaddle && this.aiPaddle && this.container) {
      this.startGame();
      this.setupMouseControls();
    }
  }

  startGame() {
    this.intervalId = setInterval(() => {
      this.update();
    }, 10);
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

    // Reset ball if it goes out of bounds
    if (this.ballY + this.ballSize >= this.container.clientHeight || this.ballY <= 0) {
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
  }
}
