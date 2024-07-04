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

  word : string = ""
  hiddenWord : string[] = []
  tries : number = 9;

  constructor() {
    this.generateButtons();
    this.generateWord();
    this.generateHiddenWord();
  }



  generateWord(){
    const id = Math.floor(Math.random() * hiddenWords.length)
    let tmp = this.removeAccents(hiddenWords[id]);
    let str = "";
    for (let c of tmp){
      str += c.toUpperCase()
    }
    this.word = str;
  }

  generateHiddenWord(){
    for (let c of this.word){
      this.hiddenWord.push("-")
    }
  }


  removeAccents(str : string) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  isInWord(char : string, word: string){
    for (let letter of word) {
      if (char === letter) {
        return true;
      }
    }
    return false;
  }

  checkWordFound() {
    for (let char of this.hiddenWord) {
      if (char === "-") {
        return false;
      }
    }
    return true;
  }

  revealLetter(char : string){
    for (let i = 0; i < this.word.length; i++){
      if (this.word[i] === char){
        this.hiddenWord[i] = char
      }
    }
  }

  checkClickedButton(event :any){
    const clickedButton = event.target;
    const letter = clickedButton.textContent.trim();
    if ( this.tries > 0 && (!this.checkWordFound()) && clickedButton.color === "primary") {
      const check = this.isInWord(letter, this.word);
      if (check) {
        this.revealLetter(letter)
        clickedButton.color = "success";
      } else {
        clickedButton.color = "danger";
        this.tries --;
      }
    }

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
  }

}
