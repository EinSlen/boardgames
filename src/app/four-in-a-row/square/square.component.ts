import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss'],
  standalone: true
})
export class SquareComponent {

  @Input() value: string = '';

  constructor() { }

}
