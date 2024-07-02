import {Component, NgModule} from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import {BrowserModule} from "@angular/platform-browser";
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
  providers: [ModalController],
})
export class AppComponent {
  constructor() {}
}
