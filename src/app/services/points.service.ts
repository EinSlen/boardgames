import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PointsService {
  playerPoints: number = 0;

  constructor() { }

  getPoints(): number {
    return this.playerPoints;
  }

  addPoints(points: number) {
    this.playerPoints += points;
  }

  removePoints(points: number) {
    this.playerPoints -= points;
  }

  resetPoints() {
    this.playerPoints = 0;
  }
}
