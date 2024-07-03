import {Component, Input, OnInit} from '@angular/core';
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle, IonCol, IonContent,
  IonFab,
  IonFabButton, IonGrid, IonHeader,
  IonIcon, IonRow, IonTitle, IonToolbar
} from '@ionic/angular/standalone';
import { ModalController } from '@ionic/angular';
import {NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";

@Component({
  selector: 'app-didact-modal',
  templateUrl: './didact-modal.component.html',
  styleUrls: ['./didact-modal.component.scss'],
  standalone: true,
  imports: [IonFab, IonFabButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonContent, IonHeader, IonToolbar, IonTitle, IonRow, IonCol, IonGrid, NgSwitchCase, NgSwitch, NgSwitchDefault],
})
export class DidactModalComponent  implements OnInit {
  @Input() gameName: string = '';

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  closeDidactModal() {
    this.modalCtrl.dismiss();
  }
}
