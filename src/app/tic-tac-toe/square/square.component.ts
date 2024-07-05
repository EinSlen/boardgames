import {Component, Input, OnInit} from '@angular/core';
import {NgClass, NgStyle} from "@angular/common";
import {TicTacToeService} from "../../services/tic-tac-toe-Service";
import {ShopModalComponent} from "../../home/shop-modal/shop-modal.component";
import {ShopService} from "../../services/shop.service";

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss'],
  imports: [
    NgClass,
    NgStyle
  ],
  standalone: true
})
export class SquareComponent  implements OnInit {
  @Input() value: string = '';
  @Input() row: number = 0;
  @Input() col: number = 0;
  constructor(public gameService: TicTacToeService, private shopService: ShopService) {
  }

  public background_color = this.shopService.TTTbgcolor;
  public background_skin = this.shopService.TTTbgskin;

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
