import {Component, NgModule} from '@angular/core';
import { IonApp, IonRouterOutlet} from '@ionic/angular/standalone';
import {BrowserModule} from "@angular/platform-browser";
import {SquareComponent} from "./tic-tac-toe/square/square.component";
import {GameboardComponent} from "./tic-tac-toe/gameboard/gameboard.component";
import {LoaderComponent} from "./loader/loader.component";
import { ModalController } from '@ionic/angular';
import { RouterLink} from "@angular/router";
import { ModalModule } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet, SquareComponent, GameboardComponent, LoaderComponent],
  providers: [ModalController],
})
export class AppComponent {
  constructor() {}
}
