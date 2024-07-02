import { Injectable } from '@angular/core';
import {AlertController} from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private alertController: AlertController) { }

  async showStartGamePopup(): Promise<string> {
    return new Promise<string>(async (resolve) => {
      const alert = await this.alertController.create({
        header: 'Qui commence ?',
        inputs: [
          { name: 'player', type: 'radio', label: 'Joueur', value: 'player', checked: true },
          { name: 'computer', type: 'radio', label: 'Ordinateur', value: 'computer' }
        ],
        buttons: [
          {
            text: 'Commencer',
            handler: (data) => {
              resolve(data);
            }
          }
        ]
      });

      await alert.present();
    });
  }
}
