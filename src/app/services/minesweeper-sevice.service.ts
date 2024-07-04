import { Injectable } from '@angular/core';
import {Difficulty, GameSettings, SETTINGS} from "../demineur/game-settings/game-settings.component";

@Injectable({
  providedIn: 'root'
})
export class MinesweeperService {
  private _board: any[][];
  private _settings: GameSettings;
  private _remainingMines: number = 0;

  constructor() {
    this._board = [];
    this._settings = SETTINGS[Difficulty.Facile];
  }

  startGame(difficulty: Difficulty) {
    this._settings = SETTINGS[difficulty];
    this._board = this.generateBoard(this._settings);
    this._remainingMines = this._settings.mines;
  }

  generateBoard(settings: GameSettings): any[][] {
    const board = Array.from({ length: settings.rows }, () =>
      Array.from({ length: settings.cols }, () => ({ mine: false, revealed: false, neighborMines: 0, hidden: true, flagged: false }))
    );

    let minesPlaced = 0;
    while (minesPlaced < settings.mines) {
      const row = Math.floor(Math.random() * settings.rows);
      const col = Math.floor(Math.random() * settings.cols);
      if (!board[row][col].mine) {
        board[row][col].mine = true;
        minesPlaced++;
      }
    }

    for (let r = 0; r < settings.rows; r++) {
      for (let c = 0; c < settings.cols; c++) {
        if (!board[r][c].mine) {
          board[r][c].neighborMines = this.countNeighborMines(board, r, c);
        }
      }
    }

    return board;
  }

  countNeighborMines(board: any[][], row: number, col: number): number {
    let count = 0;
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];

    for (const [dr, dc] of directions) {
      const nr = row + dr;
      const nc = col + dc;
      if (nr >= 0 && nr < board.length && nc >= 0 && nc < board[0].length) {
        if (board[nr][nc].mine) {
          count++;
        }
      }
    }

    return count;
  }

  revealCell(row: number, col: number) {
    const cell = this._board[row][col];
    if (cell.revealed || cell.flagged) return;

    cell.revealed = true;
    cell.hidden = false;

    if (cell.mine) {
      return 'gameOver';
    } else {
      if (cell.neighborMines === 0) {
        this.revealNeighbors(row, col);
      }
      if (this.checkWin()) {
        return 'win';
      }
    }
    return;
  }

  revealNeighbors(row: number, col: number) {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];

    for (const [dr, dc] of directions) {
      const nr = row + dr;
      const nc = col + dc;
      if (nr >= 0 && nr < this._settings.rows && nc >= 0 && nc < this._settings.cols) {
        const neighbor = this._board[nr][nc];
        if (!neighbor.revealed) {
          neighbor.revealed = true;
          neighbor.hidden = false;
          if (neighbor.neighborMines === 0) {
            this.revealNeighbors(nr, nc);
          }
        }
      }
    }
  }

  toggleFlag(row: number, col: number) {
    const cell = this._board[row][col];
    if (!cell.revealed) {
      cell.flagged = !cell.flagged;
      this._remainingMines += cell.flagged ? -1 : 1;
    }
  }

  checkWin(): boolean {
    for (let r = 0; r < this._settings.rows; r++) {
      for (let c = 0; c < this._settings.cols; c++) {
        const cell = this._board[r][c];
        if (!cell.mine && !cell.revealed) {
          return false;
        }
      }
    }
    return true;
  }

  get board() {
    return this._board;
  }

  get remainingMines() {
    return this._remainingMines;
  }

  get settings() {
    return this._settings;
  }
}
