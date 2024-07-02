import {Component, NgModule} from '@angular/core';
import { IonApp } from '@ionic/angular/standalone';
import {BrowserModule} from "@angular/platform-browser";
import { ModalController } from '@ionic/angular';
import { RouterLink} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp],
  providers: [ModalController],
})
export class AppComponent {
  constructor() {}
}
