import {Component, Input, OnInit} from '@angular/core';
import {NgClass} from "@angular/common";
import {TicTacToeService} from "../../services/tic-tac-toe-Service";

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss'],
  imports: [
    NgClass
  ],
  standalone: true
})
export class SquareComponent  implements OnInit {
  @Input() value: string = '';
  @Input() row: number = 0;
  @Input() col: number = 0;
  constructor(public gameService: TicTacToeService) { }

  ngOnInit() {}

  getWinningClass(): string {
    if (this.gameService.winningPositions) {
      for (let pos of this.gameService.winningPositions) {
        if (pos[0] === this.row && pos[1] === this.col) {
          return this.gameService.currentPlayer === 'X' ? 'win-player' : 'win-computer';
        }
      }
    }
    return '';
  }

}
