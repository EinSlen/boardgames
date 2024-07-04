import { Injectable } from '@angular/core';
import { PopupService } from './popup.service';
import {ToastService} from "./toast.service";

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

  get getdifficulty() {
    return this.difficulty
  }

  startGame(startingPlayer: string, difficulty: string) {
    this.currentPlayer = difficulty != '' ? startingPlayer === 'Joueur' ? '🔴' : '🟡' : startingPlayer === 'Joueur 1' ? '🔴' : '🟡';
    this.board = Array(6).fill(0).map(() => Array(7).fill(''));
    this.gameEnded = false;
    this.difficulty = difficulty;

    if (this.currentPlayer === '🟡') {
      this.aiMove();
    }
  }

  async placeCoin(col: number) {
    if (!this.gameEnded) {
      for (let row = this.board.length - 1; row >= 0; row--) {
        if (!this.board[row][col]) {
          await this.throwCoin(row, col, this.currentPlayer)
          if (this.checkWinner(row, col, this.currentPlayer)) {
            this.gameEnded = true;
            console.log(`${this.currentPlayer} a gagné !`);
            if (this.difficulty != '') {
              this.popupService.showGameResultPopup(this.currentPlayer === '🔴' ? "player" : "computer", this.difficulty, (difficulty) => {
                this.startGame("Joueur", difficulty);
              })
            } else {
              this.popupService.showGameResultPopup(this.currentPlayer === '🔴' ? "player1" : "player2", this.difficulty, (difficulty) => {
                this.startGame("Joueur 1", difficulty);
              })
            }
          } else if (this.isDraw()) {
            console.log("draw");
            this.gameEnded = true;
            this.popupService.showGameResultPopup("draw", this.difficulty, () => {
            })
          } else {
            this.currentPlayer = this.currentPlayer === '🔴' ? '🟡' : '🔴';
            if (this.difficulty != '' && this.currentPlayer === '🟡') {
              this.aiMove();
            }
          }
          break;
        }
      }
    }
  }

  async throwCoin(row: number, col: number, player: string) {
    for (let i = 0; i <= row; i++) {
      this.board[i][col] = player;
      if (i > 0) {
        this.board[i-1][col] = '';
      }
      await this.wait(60);
    }
  }

  checkWinner(row: number, col: number, player: string): boolean {
    // Vérifie les lignes horizontales
    let count= 0;
    for (let i = 0; i < 7; i++) {
      if (this.board[row][i] === player) {
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
      if (this.board[row + i][col] !== player) {
        break;
      }
      if (i === 3) {
        return true;
      }
    }

    // Vérifie les diagonales : \
    for (let i = 3; i < 6; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.board[i][j] === player &&
          this.board[i-1][j+1] === player &&
          this.board[i-2][j+2] === player &&
          this.board[i-3][j+3] === player) {
          return true;
        }
      }
    }


    // Vérifie les diagonales : /
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 4; j++) {
        if (this.board[i][j] === player &&
          this.board[i+1][j+1] === player &&
          this.board[i+2][j+2] === player &&
          this.board[i+3][j+3] === player) {
          return true;
        }
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
          move = this.getRandomMove();
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

  getBestMove(): { row: number, col: number } {
    const opponentWinningMove = this.checkOpponentWinningMove('🔴');
    if (opponentWinningMove) {
      console.log('Bloquer le coup gagnant de l\'adversaire : ', opponentWinningMove);
      return opponentWinningMove;
    }

    const move = this.getRandomMove();
    this.board[move.row][move.col] = '🟡';
    if (this.checkOpponentWinningMove('🔴')) {
      console.log('Eviter le coup gagnant de l\'adversaire : ', move);
      this.board[move.row][move.col] = '';
      this.getBestMove();
    }

    this.board[move.row][move.col] = '';
    return move;
  }

  checkOpponentWinningMove(player: string): { row: number, col: number } | null {
    for (let row = 0; row < 6; row++) {
      for (let col = 0; col < 7; col++) {
        if (!this.board[row][col]) {
          this.board[row][col] = player;
          if (this.checkWinner(row, col, player)) {
            console.log('Coup gagnant de l\'adversaire : ', { row, col })
            this.board[row][col] = '';
            return { row, col };
          }
          this.board[row][col] = '';
        }
      }
    }
    return null;
  }

  wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
