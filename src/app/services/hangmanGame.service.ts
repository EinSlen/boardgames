import {alphabet} from "../models/keyboard";
import {Injectable} from "@angular/core";
import {hiddenWords} from "../models/hiddenWords";


@Injectable({
  providedIn: 'root'
})
export class HangmanGameService{
  firstRow : string[] = [];
  secondRow: string[] = [];
  thirdRow : string[] = [];

  numFirstRow : number[]  = [];
  numSecondRow : number[] = [];
  numThirdRow : number[] = [];
  numLastRow : number[] = [];

  word : string = ""
  hiddenWord : string[] = []


  constructor() {
    this.generateButtons();
    this.generateWord();
    this.generateHiddenWord();
  }


  generateWord(){
    const id = Math.floor(Math.random() * 20)
    let tmp = this.removeAccents(hiddenWords[id]);
    let str = "";
    for (let c of tmp){
      str += c.toUpperCase()
    }
    this.word = this.removeAccents(str);
  }

  generateHiddenWord(){
    for (let c of this.word){
      this.hiddenWord.push("-")
    }
  }

  removeAccents(str : string) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  generateButtons(){
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
        this.numLastRow.push(i);
      }
      else if (i <=3){
        this.numFirstRow.push(i);
      }
      else if (i <= 6){
        this.numSecondRow.push(i);
      }
      else if (i <= 9){
        this.numThirdRow.push(i);
      }
    }
  }

}
