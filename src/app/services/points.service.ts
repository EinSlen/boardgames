import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PointsService {
  playerPoints: number;
  key = 'playerPoints';

  constructor() {
    this.playerPoints = this.getPoints();
  }

  getPoints(): number {
    const item = localStorage.getItem(this.key);
    return item ? parseInt(item) : 0;
  }

  addPoints(points: number) {
    this.playerPoints += points;
    this.setPoints();
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
    localStorage.setItem(this.key, this.playerPoints.toString());
  }
}
