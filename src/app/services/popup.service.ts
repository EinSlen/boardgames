import { Injectable } from '@angular/core';
import {AlertController} from "@ionic/angular";
import * as confetti from 'canvas-confetti';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  constructor(private alertController: AlertController) {}

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

  async showGameResultPopup(winner: string, restartCallback: (difficulty: string) => void) {
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
            this.promptDifficultySelection(restartCallback);
          }
        }
      ]
    });

    await alert.present();

    if (winner === 'player') {
      this.launchConfetti();
    }
  }

  private async promptDifficultySelection(restartCallback: (difficulty: string) => void) {
    const difficultyAlert = await this.alertController.create({
      header: 'Choisissez la difficulté',
      inputs: [
        {
          name: 'difficulty',
          type: 'radio',
          label: 'Facile',
          value: 'facile',
          checked: true
        },
        {
          name: 'difficulty',
          type: 'radio',
          label: 'Moyen',
          value: 'medium'
        },
        {
          name: 'difficulty',
          type: 'radio',
          label: 'Expert',
          value: 'expert'
        }
      ],
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: (data) => {
            restartCallback(data.difficulty);
          }
        }
      ]
    });

    await difficultyAlert.present();
  }

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
