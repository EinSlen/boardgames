import {Component, OnInit} from '@angular/core';
import {Toast, ToastService} from "../services/toast.service";
import {NgClass, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [
    NgClass,
    NgForOf,
    NgIf
  ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnInit {
  toasts: Toast[] = [];

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    this.toastService.toastState.subscribe((toast: Toast) => {
      //toast.number = this.toasts.length + 1; // Assign a number to each toast
      this.toasts.push(toast);
      setTimeout(() => this.removeToast(toast), 3000);
    });
  }

  removeToast(toast: Toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
