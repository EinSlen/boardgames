import { Component, OnInit } from '@angular/core';
import {alphabet} from "../../models/keyboard";
import {IonicModule} from "@ionic/angular";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss'],
  imports: [
    IonicModule,
    NgForOf
  ],
  standalone: true
})
export class KeyboardComponent  implements OnInit {

  firstRow : string[] = [];
  secondRow: string[] = [];
  thirdRow : string[] = [];


  numFirstRow : number[]  = [];
  numSecondRow : number[] = [];
  numThirdRow : number[] = [];
  numLastRow : number[] = [];

  constructor() {
    for (let i = 0; i < alphabet.length; i++){
      if (i <= 9){
        this.firstRow.push(alphabet[i]);
      }
      else if (i <= 19){
        this.secondRow.push(alphabet[i]);
      }
      else {
        this.thirdRow.push(alphabet[i])
      }
    }

    for (let i = 0; i < 10; i++){
      if (i === 0){
        this.numLastRow.push(i)
      }
      else if (i <=3){
        this.numFirstRow.push(i)
      }
      else if (i <= 6){
        this.numSecondRow.push(i)
      }
      else if (i <= 9){
        this.numThirdRow.push(i)
      }
    }

  }

  ngOnInit() {}






}
