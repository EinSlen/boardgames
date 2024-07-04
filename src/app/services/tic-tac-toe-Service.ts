import { Injectable } from '@angular/core';
import {PopupService} from "./popup.service";
import {MorpionPage} from "../tic-tac-toe/morpion/morpion.page";
import {ToastService} from "./toast.service";

@Injectable({
  providedIn: 'root'
})
export class TicTacToeService {

  currentPlayer: string = 'X';
  board: string[][] = [];
  gameEnded: boolean = false;
  difficulty: string = 'facile';
  thinking: boolean = false;
  winningPositions: number[][] | null = null;

  constructor(private popupService: PopupService) {}

  get getdifficulty() {
    return this.difficulty
  }

  startGame(startingPlayer: string, difficulty: string) {
    console.log(difficulty)
    this.currentPlayer = difficulty != '' ? startingPlayer === 'Joueur' ? 'X' : 'O' : startingPlayer === 'Joueur 1' ? 'X' : 'O';
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    this.gameEnded = false;
    this.difficulty = difficulty;
    this.winningPositions = null;

    if (this.difficulty != '' && this.currentPlayer === 'O') {
      this.aiMove();
    }
  }

  selectSquare(row: number, col: number) {
    if (!this.board[row][col] && !this.gameEnded) {
      this.board[row][col] = this.currentPlayer;
      const winningPositions = this.checkWinner(row, col);
      if (winningPositions) {
        this.gameEnded = true;
        this.winningPositions = winningPositions;
        console.log(`${this.currentPlayer} a gagné !`);
        if(this.difficulty != '') {
          this.popupService.showGameResultPopup( this.currentPlayer === 'X' ? "player" : "computer", (difficulty) => {
            this.startGame("Joueur", difficulty);
          })
        } else {
          this.popupService.showGameResultPopup( this.currentPlayer === 'X' ? "player1" : "player2", (difficulty) => {
            this.startGame("Joueur 1", difficulty);
          })
        }
      } else if (this.isDraw()) {
        console.log("draw");
        this.gameEnded = true;
        this.popupService.showGameResultPopup('draw', (difficulty) => {
          this.startGame("Joueur", difficulty);
        });
      } else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        if (this.difficulty != '' && this.currentPlayer === 'O') {
          this.aiMove();
        }
      }
    }
  }


  checkWinner(row: number, col: number): number[][] | null {
    let winPositions: number[][] = [];

    if (this.board[row][0] === this.currentPlayer && this.board[row][1] === this.currentPlayer && this.board[row][2] === this.currentPlayer) {
      winPositions = [[row, 0], [row, 1], [row, 2]];
    } else if (this.board[0][col] === this.currentPlayer && this.board[1][col] === this.currentPlayer && this.board[2][col] === this.currentPlayer) {
      winPositions = [[0, col], [1, col], [2, col]];
    } else if (row === col && this.board[0][0] === this.currentPlayer && this.board[1][1] === this.currentPlayer && this.board[2][2] === this.currentPlayer) {
      winPositions = [[0, 0], [1, 1], [2, 2]];
    } else if (row + col === 2 && this.board[0][2] === this.currentPlayer && this.board[1][1] === this.currentPlayer && this.board[2][0] === this.currentPlayer) {
      winPositions = [[0, 2], [1, 1], [2, 0]];
    }

    if (winPositions.length > 0) {
      return winPositions;
    } else {
      return null;
    }
  }


  isDraw(): boolean {
    let isDraw = true;
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] === '') {
          isDraw = false;
        }
      }
    }
    return isDraw
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
        this.selectSquare(move.row, move.col);
      }

      this.thinking = false;
    }, 1000);
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

  getBestMove(): any {
    let bestScore = -Infinity;
    let move = { row: -1, col: -1 };

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j] === '') {
          this.board[i][j] = 'O';
          let score = this.minimax(this.board, 0, false);
          this.board[i][j] = '';
          if (score > bestScore) {
            bestScore = score;
            move = { row: i, col: j };
          }
        }
      }
    }

    return move.row === -1 ? null : move;
  }

  minimax(board: string[][], depth: number, isMaximizing: boolean):any {
    const scores = {
      'O': 1,
      'X': -1,
      'tie': 0
    };

    const result = this.checkWinnerMinimax(board);
    if (result !== null) {
      return scores[result as keyof typeof scores];
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === '') {
            board[i][j] = 'O';
            let score = this.minimax(board, depth + 1, false);
            board[i][j] = '';
            bestScore = Math.max(score, bestScore);
          }
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === '') {
            board[i][j] = 'X';
            let score = this.minimax(board, depth + 1, true);
            board[i][j] = '';
            bestScore = Math.min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  }

  checkWinnerMinimax(board: string[][]): any {
    for (let i = 0; i < 3; i++) {
      if (board[i][0] === board[i][1] && board[i][1] === board[i][2] && board[i][0] !== '') {
        return board[i][0];
      }
      if (board[0][i] === board[1][i] && board[1][i] === board[2][i] && board[0][i] !== '') {
        return board[0][i];
      }
    }

    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== '') {
      return board[0][0];
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== '') {
      return board[0][2];
    }

    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
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
