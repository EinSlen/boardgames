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
@ViewChild('pongCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;
  ctx: CanvasRenderingContext2D | null = null;
  intervalId: any;


  paddleWidth = 10;
  paddleHeight = 100;
  ballSize = 10;

  player1 = {
    x: 20,
    y: 150,
    width: this.paddleWidth,
    height: this.paddleHeight,
    score: 0,
  };

  player2 = {
    x: 570,
    y: 150,
    width: this.paddleWidth,
    height: this.paddleHeight,
    score: 0,
  };

  ball = {
    x: 300,
    y: 200,
    dx: 3,
    dy: 3,
    size: this.ballSize,
  };

  // Pour suivre la position de la souris
  mousePosition = {
    x: 0,
    y: 0,
  };

  constructor() {}

  ngAfterViewInit() {
    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.startGame();
    this.setupMouseControls();
  }

  startGame() {
    this.intervalId = setInterval(() => {
      this.draw();
    }, 10);
  }

  draw() {
    if (!this.ctx) return; // Vérifie si le contexte est défini
    this.clearCanvas();
    this.updatePlayerPosition();
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
    if (this.ctx) this.ctx.clearRect(0, 0, this.canvasRef.nativeElement.width, this.canvasRef.nativeElement.height);
  }

  drawPaddle(x: number, y: number) {
    if (this.ctx) {
      this.ctx.fillStyle = '#FFF';
      this.ctx.fillRect(x, y, this.paddleWidth, this.paddleHeight);
    }
  }

  drawBall(x: number, y: number) {
    if (this.ctx) {
      this.ctx.beginPath();
      this.ctx.arc(x, y, this.ballSize, 0, Math.PI * 2);
      this.ctx.fillStyle = '#FFF';
      this.ctx.fill();
      this.ctx.closePath();
    }
  }

  checkCollision() {
    // Check collision with top and bottom walls
    if (this.ball.y + this.ball.dy > this.canvasRef.nativeElement.height - this.ballSize || this.ball.y + this.ball.dy < this.ballSize) {
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
    if (this.ball.x + this.ball.dx > this.canvasRef.nativeElement.width - this.ballSize) {
      this.player1.score++;
      this.resetBall();
    }

    if (this.ball.x + this.ball.dx < this.ballSize) {
      this.player2.score++;
      this.resetBall();
    }
  }

  resetBall() {
    this.ball.x = this.canvasRef.nativeElement.width / 2;
    this.ball.y = this.canvasRef.nativeElement.height / 2;
    this.ball.dx = -this.ball.dx;
    this.ball.dy = -this.ball.dy;
  }

  updatePlayerPosition() {
    // Mise à jour de la position du joueur 1 en fonction de la position de la souris
    this.player1.y = this.mousePosition.y - this.paddleHeight / 2;

    // Limitez la position du joueur 1 à l'écran
    this.player1.y = Math.max(Math.min(this.player1.y, this.canvasRef.nativeElement.height - this.paddleHeight), 0);

    // Mise à jour de la position de l'IA (joueur 2)
    // Simulation d'une IA simple qui suit la balle
    if (this.ball.y > this.player2.y + this.paddleHeight / 2) {
      this.player2.y += 3; // Vitesse de déplacement de l'IA
    } else if (this.ball.y < this.player2.y + this.paddleHeight / 2) {
      this.player2.y -= 3; // Vitesse de déplacement de l'IA
    }

    // Limitez la position de l'IA à l'écran
    this.player2.y = Math.max(Math.min(this.player2.y, this.canvasRef.nativeElement.height - this.paddleHeight), 0);
  }

  setupMouseControls() {
    // Écoute des mouvements de la souris sur le canvas
    this.canvasRef.nativeElement.addEventListener('mousemove', (event) => {
      const canvasRect = this.canvasRef.nativeElement.getBoundingClientRect();
      this.mousePosition.x = event.clientX - canvasRect.left;
      this.mousePosition.y = event.clientY - canvasRect.top;
    });
  }
}
