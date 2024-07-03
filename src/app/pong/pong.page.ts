import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
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
export class PongPage implements OnInit {
  @ViewChild('pongCanvas', { static: true }) canvas: HTMLCanvasElement = document.getElementById('pongCanvas') as HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null = this.canvas.getContext('2d');
  intervalId: any;

  paddleHeight = 100;
  paddleWidth = 10;
  ballSize = 10;

  player1 = {
    x: 20,
    y: 150,
    width: this.paddleWidth,
    height: this.paddleHeight,
    score: 0
  };

  player2 = {
    x: 570,
    y: 150,
    width: this.paddleWidth,
    height: this.paddleHeight,
    score: 0
  };

  ball = {
    x: 300,
    y: 200,
    dx: 3,
    dy: 3,
    size: this.ballSize
  };

  constructor() { }

  ngOnInit() {
    this.canvas = document.getElementById('pongCanvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');
    this.startGame();
  }

  startGame() {
    this.intervalId = setInterval(() => {
      this.draw();
    }, 10);
  }

  draw() {
    this.clearCanvas();
    this.drawPaddle(this.player1.x, this.player1.y);
    this.drawPaddle(this.player2.x, this.player2.y);
    this.drawBall(this.ball.x, this.ball.y);
    this.ball.x += this.ball.dx;
    this.ball.y += this.ball.dy;

    // Check collision with walls and paddles
    this.checkCollision();
    // Check if ball passed paddles
    this.checkPoint();
  }

  clearCanvas() {
    if(this.ctx) this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawPaddle(x: number, y: number) {
    if(this.ctx) {
      this.ctx.fillStyle = '#FFF';
      this.ctx.fillRect(x, y, this.paddleWidth, this.paddleHeight);
    }
  }

  drawBall(x: number, y: number) {
    if(this.ctx) {
      this.ctx.beginPath();
      this.ctx.arc(x, y, this.ballSize, 0, Math.PI * 2);
      this.ctx.fillStyle = '#FFF';
      this.ctx.fill();
      this.ctx.closePath();
    }

  }

  checkCollision() {
    // Check collision with top and bottom walls
    if (this.ball.y + this.ball.dy > this.canvas.height - this.ballSize || this.ball.y + this.ball.dy < this.ballSize) {
      this.ball.dy = -this.ball.dy;
    }

    // Check collision with paddles
    if (this.ball.x + this.ball.dx > this.player2.x &&
      this.ball.y > this.player2.y &&
      this.ball.y < this.player2.y + this.player2.height) {
      this.ball.dx = -this.ball.dx;
    }

    if (this.ball.x + this.ball.dx < this.player1.x + this.player1.width &&
      this.ball.y > this.player1.y &&
      this.ball.y < this.player1.y + this.player1.height) {
      this.ball.dx = -this.ball.dx;
    }
  }

  checkPoint() {
    // Check if ball passed the paddles
    if (this.ball.x + this.ball.dx > this.canvas.width - this.ballSize) {
      this.player1.score++;
      this.resetBall();
    }

    if (this.ball.x + this.ball.dx < this.ballSize) {
      this.player2.score++;
      this.resetBall();
    }
  }

  resetBall() {
    this.ball.x = this.canvas.width / 2;
    this.ball.y = this.canvas.height / 2;
    this.ball.dx = -this.ball.dx;
    this.ball.dy = -this.ball.dy;
  }

  @HostListener('document.keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowUp' && this.player2.y > 0) {
      this.player2.y -= 10;
    }
    if (event.key === 'ArrowDown' && this.player2.y < this.canvas.height - this.player2.height) {
      this.player2.y += 10;
    }
    if (event.key === 'w' && this.player1.y > 0) {
      this.player1.y -= 10;
    }
    if (event.key === 's' && this.player1.y < this.canvas.height - this.player1.height) {
      this.player1.y += 10;
    }
  }
}
