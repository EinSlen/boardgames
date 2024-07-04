import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import {Difficulty, GameSettings, GameSettingsComponent, SETTINGS} from "../game-settings/game-settings.component";

@Component({
  selector: 'app-minesweeper',
  templateUrl: './minesweeper.page.html',
  styleUrls: ['./minesweeper.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, GameSettingsComponent]
})
export class MinesweeperPage implements OnInit {
  board: any[][];
  settings: GameSettings;
  difficulty: Difficulty = Difficulty.Facile;

  constructor() {
    this.board = [];
    this.settings = SETTINGS[this.difficulty];
  }

  ngOnInit() {
    this.startGame(this.difficulty);
  }

  startGame(difficulty: Difficulty) {
    this.settings = SETTINGS[difficulty]
    this.board = this.generateBoard(this.settings);
  }

  generateBoard(settings: GameSettings): any[][] {
    const board = Array.from({ length: settings.rows }, () =>
      Array.from({ length: settings.cols }, () => ({ mine: false, revealed: false, neighborMines: 0, hidden: true }))
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

    // Calculer le nombre de bombes voisines pour chaque cellule
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
    const cell = this.board[row][col];
    if (cell.revealed || cell.flagged) return;

    cell.revealed = true;

    if (cell.mine) {
      alert('Game Over!');
      this.startGame(this.difficulty);
    } else {
      if (cell.neighborMines === 0) {
        this.revealNeighbors(row, col);
      }
    }
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
      if (nr >= 0 && nr < this.settings.rows && nc >= 0 && nc < this.settings.cols) {
        const neighbor = this.board[nr][nc];
        if (!neighbor.revealed) {
          neighbor.revealed = true;
          if (neighbor.neighborMines === 0) {
            this.revealNeighbors(nr, nc);
          }
        }
      }
    }
  }

  toggleFlag(event: MouseEvent, row: number, col: number) {
    event.preventDefault();
    const cell = this.board[row][col];
    if (!cell.revealed) {
      cell.flagged = !cell.flagged;
    }
  }
}
