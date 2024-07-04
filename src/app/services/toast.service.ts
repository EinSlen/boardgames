import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

export interface Toast {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor() { }

  private toastSubject = new Subject<Toast>();
  toastState = this.toastSubject.asObservable();

  show(message: string, type: 'success' | 'error' | 'info' | 'warning') {
    this.toastSubject.next({ message, type });
  }
}
