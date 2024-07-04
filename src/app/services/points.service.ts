import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PointsService {
  playerPoints: number;
  highScore: number;
  pointsKey = 'playerPoints';
  highScoreKey = 'highScore';

  constructor() {
    this.playerPoints = this.getPoints();
    this.highScore = this.getHighScore();
  }

  getPoints(): number {
    const item = localStorage.getItem(this.pointsKey);
    return item ? parseInt(item, 10) : 0;
  }

  getHighScore(): number {
    const item = localStorage.getItem(this.highScoreKey);
    return item ? parseInt(item, 10) : 0;
  }

  addPoints(points: number) {
    this.playerPoints += points;
    this.setPoints();
    this.updateHighScore();
  }

  removePoints(points: number) {
    this.playerPoints -= points;
    this.setPoints();
  }

  resetPoints() {
    this.playerPoints = 0;
    this.setPoints();
  }

  private setPoints() {
    localStorage.setItem(this.pointsKey, this.playerPoints.toString());
  }

  private updateHighScore() {
    if (this.playerPoints > this.highScore) {
      this.highScore = this.playerPoints;
      localStorage.setItem(this.highScoreKey, this.highScore.toString());
    }
  }
}
