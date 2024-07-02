import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import {BrowserModule} from "@angular/platform-browser";
import {SquareComponent} from "./tic-tac-toe/square/square.component";
import {GameboardComponent} from "./tic-tac-toe/gameboard/gameboard.component";
import {LoaderComponent} from "./loader/loader.component";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, SquareComponent, GameboardComponent, LoaderComponent],
})
export class AppComponent {
  constructor() {}
}
