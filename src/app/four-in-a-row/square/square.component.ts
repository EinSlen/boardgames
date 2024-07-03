import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-square',
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss'],
  standalone: true
})
export class SquareComponent  implements OnInit {
  @Input() value: string = '';
  constructor() { }

  ngOnInit() {}

}
