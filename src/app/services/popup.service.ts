import { Injectable } from '@angular/core';
import {AlertController} from "@ionic/angular";
import * as confetti from 'canvas-confetti';

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
          { name: 'player', type: 'radio', label: 'Joueur', value: 'Joueur', checked: true },
          { name: 'computer', type: 'radio', label: 'Ordinateur', value: 'Ordinateur' }
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

  async showGameResultPopup(winner: string) {
    const emoji = winner === 'player' ? '🎉' :
      winner === 'computer' ? '💩' :
        '❌';

    const alert = await this.alertController.create({
      header: winner === 'player' ? 'Bien joué, Joueur ! Vous avez gagné.' :
        winner === 'computer' ? 'Désolé, vous avez perdu contre l\'ordinateur.' :
          'Match nul.',
      message: `${emoji}`,
      buttons: [
        {
          text: 'RECOMMENCER',
          handler: () => {
            //TODO add demain ici la logique pour recommencer le jeu
          }
        }
      ]
    });

    await alert.present();

    if (winner === 'player') {
      this.launchConfetti(); // Lancer les confettis si le joueur gagne
    }
  }

  // Méthode pour lancer les confettis
  private launchConfetti() {
    confetti.create(undefined, {
      resize: true,
      useWorker: true
    })({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}
