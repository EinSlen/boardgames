import { Injectable } from '@angular/core';
import { PopupService } from './popup.service';

@Injectable({
  providedIn: 'root'
})
export class Puissance4Service {

  currentPlayer: string = '🔴';
  board: string[][] = [];
  gameEnded: boolean = false;
  difficulty: string = 'facile';
  thinking: boolean = false;

  constructor(private popupService: PopupService) { }

  startGame(startingPlayer: string, difficulty: string) {
    this.currentPlayer = startingPlayer === 'Joueur' ? '🔴' : '🟡';
    this.board = Array(6).fill(0).map(() => Array(7).fill(''));
    this.gameEnded = false;
    this.difficulty = difficulty;

    if (this.currentPlayer === '🟡') {
      this.aiMove();
    }
  }

  placeCoin(col: number) {
    if (!this.gameEnded) {
      for (let row = this.board.length - 1; row >= 0; row--) {
        if (!this.board[row][col]) {
          this.board[row][col] = this.currentPlayer;
          if (this.checkWinner(row, col)) {
            this.gameEnded = true;
            console.log(`${this.currentPlayer} a gagné !`);
            this.popupService.showGameResultPopup( this.currentPlayer === '🔴' ? "player" : "computer", () => {})
          } else if (this.isDraw()) {
            console.log("draw");
            this.gameEnded = true;
            this.popupService.showGameResultPopup( "draw", () => {})
          } else {
            this.currentPlayer = this.currentPlayer === '🔴' ? '🟡' : '🔴';
            if (this.currentPlayer === '🟡') {
              this.aiMove();
            }
          }
          break;
        }
      }
    }
  }


  checkWinner(row: number, col: number): boolean {
    // Vérifie les lignes horizontales
    let count= 0;
    for (let i = 0; i < 7; i++) {
      if (this.board[row][i] === this.currentPlayer) {
        count++;
        if (count === 4) {
          return true;
        }
      } else {
        count = 0;
      }
    }

    // Vérifie les lignes verticales
    for (let i = 0; i < 4; i++) {
      if (row + i >= 6) {
        break;
      }
      if (this.board[row + i][col] !== this.currentPlayer) {
        break;
      }
      if (i === 3) {
        return true;
      }
    }

    // Vérifie les diagonales vers le bas
    for (let i = 0; i < 4; i++) {
      if (col + i >= 7 || row + i >= 6) {
        break;
      }
      if (this.board[row + i][col + i] !== this.currentPlayer) {
        break;
      }
      if (i === 3) {
        return true;
      }
    }

    // Vérifie les diagonales vers le haut
    for (let i = 0; i < 4; i++) {
      if (col + i >= 7 || row - i < 0) {
        break;
      }
      if (this.board[row - i][col + i] !== this.currentPlayer) {
        break;
      }
      if (i === 3) {
        return true;
      }
    }

    return false;
  }

  isDraw(): boolean {
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        if (!this.board[row][col]) {
          return false;
        }
      }
    }
    return true;
  }

  aiMove() {
    this.thinking = true;

    setTimeout(() => {
      let move: { row: number, col: number } | null;
      switch (this.difficulty) {
        case 'facile':
          move = this.getRandomMove();
          break;
        case 'medium':
          move = this.getMediumMove();
          break;
        case 'expert':
          move = this.getBestMove();
          break;
        default:
          move = this.getRandomMove();
          break;
      }

      if (move) {
        this.placeCoin(move.col);
      }

      this.thinking = false;
    }, 1000);
  }

  getRandomMove(): { row: number, col: number } {
    const emptyColumns = [];
    for (let col = 0; col < 7; col++) {
      if (!this.board[0][col]) {
        emptyColumns.push(col);
      }
    }
    const col = emptyColumns[Math.floor(Math.random() * emptyColumns.length)];
    for (let row = 5; row >= 0; row--) {
      if (!this.board[row][col]) {
        return { row, col };
      }
    }
    return { row: -1, col: -1 };
  }

  getMediumMove(): { row: number, col: number } | null {
    // Implémentation basique pour Medium: mélanger entre aléatoire et meilleurs mouvements
    return Math.random() < 0.5 ? this.getRandomMove() : this.getBestMove();
  }

  getBestMove(): any {
    let bestScore = -Infinity;
    let move = { row: -1, col: -1 };

    for (let col = 0; col < 7; col++) {
      if (!this.board[0][col]) {
        for (let row = 5; row >= 0; row--) {
          if (!this.board[row][col]) {
            this.board[row][col] = '🟡';
            let score = this.minimax(this.board, 0, false);
            this.board[row][col] = '';
            if (score > bestScore) {
              bestScore = score;
              move = { row, col };
            }
            break;
          }
        }
      }
    }

    return move.row === -1 ? null : move;
  }

  minimax(board: string[][], depth: number, isMaximizing: boolean):any {
    const scores = {
      '🟡': 1,
      '🔴': -1,
      'tie': 0
    };

    const result = this.checkWinnerMinimax(board);
    if (result !== null) {
      return scores[result as keyof typeof scores];
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let col = 0; col < 7; col++) {
        if (!board[0][col]) {
          for (let row = 5; row >= 0; row--) {
            if (!board[row][col]) {
              board[row][col] = '🟡';
              let score = this.minimax(board, depth + 1, false);
              board[row][col] = '';
              bestScore = Math.max(score, bestScore);
              break;
            }
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let col = 0; col < 7; col++) {
        if (!board[0][col]) {
          for (let row = 5; row >= 0; row--) {
            if (!board[row][col]) {
              board[row][col] = '🔴';
              let score = this.minimax(board, depth + 1, true);
              board[row][col] = '';
              bestScore = Math.min(score, bestScore);
              break;
            }
          }
        }
      }
      return bestScore;
    }
  }

  checkWinnerMinimax(board: string[][]): any {
    // Vérifie les lignes horizontales
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 4; col++) {
        if (
          board[row][col] !== '' &&
          board[row][col] === board[row][col + 1] &&
          board[row][col + 1] === board[row][col + 2] &&
          board[row][col + 2] === board[row][col + 3]
        ) {
          return board[row][col];
        }
      }
    }

    // Vérifie les lignes verticales
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 7; col++) {
        if (
          board[row][col] !== '' &&
          board[row][col] === board[row + 1][col] &&
          board[row + 1][col] === board[row + 2][col] &&
          board[row + 2][col] === board[row + 3][col]
        ) {
          return board[row][col];
        }
      }
    }

    // Vérifie les diagonales vers le bas
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 4; col++) {
        if (
          board[row][col] !== '' &&
          board[row][col] === board[row + 1][col + 1] &&
          board[row + 1][col + 1] === board[row + 2][col + 2] &&
          board[row + 2][col + 2] === board[row + 3][col + 3]
        ) {
          return board[row][col];
        }
      }
    }

    // Vérifie les diagonales vers le haut
    for (let row = 3; row < 6; row++) {
      for (let col = 0; col < 4; col++) {
        if (
          board[row][col] !== '' &&
          board[row][col] === board[row - 1][col + 1] &&
          board[row - 1][col + 1] === board[row - 2][col + 2] &&
          board[row - 2][col + 2] === board[row - 3][col + 3]
        ) {
          return board[row][col];
        }
      }
    }

    let openSpots = 0;
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        if (board[i][j] === '') {
          openSpots++;
        }
      }
    }

    if (openSpots === 0) {
      return 'tie';
    }
    return null;
  }

}
