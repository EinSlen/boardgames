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
    path: 'hangman-page',
    loadComponent: () => import('./hangman/hangman-page/hangman.page').then(m => m.HangmanPage)
  },

  {
    path: 'puissance4',
    loadComponent: () => import('./four-in-a-row/puissance4/puissance4.page').then( m => m.Puissance4Page)
  },
  {
    path: 'demineur',
    loadComponent: () => import('./demineur/minesweeper/minesweeper.page').then(m => m.MinesweeperPage)
  },
  {
    path: 'pong',
    loadComponent: () => import('./pong/pong.page').then( m => m.PongPage)
  },
];
