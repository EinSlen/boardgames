import { Injectable } from '@angular/core';
import {AlertController} from "@ionic/angular";
import * as confetti from 'canvas-confetti';
import {ToastService} from "./toast.service";

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  constructor(private alertController: AlertController, private toastService: ToastService) {}

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
    const emoji = winner.includes('player') ? '🎉' :
      winner === 'computer' ? '💩' :
        '❌';

    const alert = await this.alertController.create({
      header: winner === 'player' ? 'Bien joué, Joueur ! Vous avez gagné.' :
        winner === 'computer' ? 'Désolé, vous avez perdu contre l\'ordinateur.' : winner === 'player1' ? 'Bien joué, Joueur 1 ! Vous avez gagné.'
          : winner === 'player2' ? 'Bien joué, Joueur 2 ! Vous avez gagné.'  :
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

    if (winner.includes('player')) {
      this.launchConfetti();
    }
  }

  async showGameResultPong(winner: string, restartCallback: (difficulty: string) => void) {
    const emoji = winner.includes('player') ? '🎉' :
      winner === 'computer' ? '💩' :
        '❌';

    const alert = await this.alertController.create({
      header: winner === 'player' ? 'Bien joué, Joueur ! Vous avez gagné.' :
        winner === 'computer' ? 'Désolé, vous avez perdu contre l\'ordinateur.' : winner === 'player1' ? 'Bien joué, Joueur 1 ! Vous avez gagné.'
          : winner === 'player2' ? 'Bien joué, Joueur 2 ! Vous avez gagné.'  :
            'Match nul.',
      message: `${emoji}`,
      buttons: [
        {
          text: 'RECOMMENCER',
          handler: (data) => {
            restartCallback(data)
          }
        }
      ]
    });

    await alert.present();

    if (winner.includes('player')) {
      this.launchConfetti();
    }
  }
  private async promptGameModeSelection(restartCallback: (mode: string, difficulty?: string) => void) {
    const modeAlert = await this.alertController.create({
      header: 'Choisissez le mode de jeu',
      inputs: [
        {
          name: 'mode',
          type: 'radio',
          label: 'Joueur contre Joueur',
          value: 'pvp',
          checked: true
        },
        {
          name: 'mode',
          type: 'radio',
          label: 'Joueur contre Ordinateur',
          value: 'pvc'
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
            if (data === 'pvc') {
              this.promptDifficultySelection(difficulty => restartCallback('pvc', difficulty));
            } else {
              restartCallback('pvp');
            }
          }
        }
      ]
    });

    await modeAlert.present();
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
            restartCallback(data);
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
