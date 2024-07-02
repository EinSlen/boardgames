import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  currentPlayer: string = 'X';
  board: string[][] = [];
  gameEnded: boolean = false;
  difficulty: string = 'facile';

  constructor() {}

  startGame(startingPlayer: string, difficulty: string) {
    this.currentPlayer = startingPlayer === 'player' ? 'X' : 'O';
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    this.gameEnded = false;
    this.difficulty = difficulty;

    if (this.currentPlayer === 'O') {
      this.aiMove();
    }
  }

  selectSquare(row: number, col: number) {
    if (!this.board[row][col] && !this.gameEnded) {
      this.board[row][col] = this.currentPlayer;
      if (this.checkWinner(row, col)) {
        this.gameEnded = true;
        console.log(`Le joueur ${this.currentPlayer} a gagné !`);
      } else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        if (this.currentPlayer === 'O') {
          this.aiMove();
        }
      }
    }
  }

  checkWinner(row: number, col: number): boolean {
    if (
      this.board[row][0] === this.currentPlayer &&
      this.board[row][1] === this.currentPlayer &&
      this.board[row][2] === this.currentPlayer
    ) {
      return true;
    }
    if (
      this.board[0][col] === this.currentPlayer &&
      this.board[1][col] === this.currentPlayer &&
      this.board[2][col] === this.currentPlayer
    ) {
      return true;
    }
    if (
      row === col &&
      this.board[0][0] === this.currentPlayer &&
      this.board[1][1] === this.currentPlayer &&
      this.board[2][2] === this.currentPlayer
    ) {
      return true;
    }
    if (
      row + col === 2 &&
      this.board[0][2] === this.currentPlayer &&
      this.board[1][1] === this.currentPlayer &&
      this.board[2][0] === this.currentPlayer
    ) {
      return true;
    }
    return false;
  }

  aiMove() {
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
      this.selectSquare(move.row, move.col);
    }
  }

  getRandomMove(): { row: number, col: number } {
    const emptySquares = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j] === '') {
          emptySquares.push({ row: i, col: j });
        }
      }
    }
    return emptySquares[Math.floor(Math.random() * emptySquares.length)];
  }

  getMediumMove(): { row: number, col: number } | null {
    // Implémentation basique pour Medium: mélanger entre aléatoire et meilleurs mouvements
    return Math.random() < 0.5 ? this.getRandomMove() : this.getBestMove();
  }

  getBestMove(): { row: number, col: number } | null {
    // Implémentation basique pour Expert: IA minimax (non implémenté ici pour simplification)
    // Retourner le premier mouvement libre pour la démonstration
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j] === '') {
          return { row: i, col: j };
        }
      }
    }
    return null;
  }

}
