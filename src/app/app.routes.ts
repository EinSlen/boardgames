import {RouterModule, Routes} from '@angular/router';
import {NgModule} from "@angular/core";

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'morpion',
    loadComponent: () => import('./tic-tac-toe/morpion/morpion.page').then(m => m.MorpionPage)
  },
  {
    path: 'hangmanGame',
    loadComponent: () => import('./hangman/hangmanGame/hangman.page').then(m => m.HangmanPage)
  },


];
