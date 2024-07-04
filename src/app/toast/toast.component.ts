import {Component, OnInit} from '@angular/core';
import {Toast, ToastService} from "../services/toast.service";
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [
    NgClass,
    NgForOf
  ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnInit {
  toasts: Toast[] = [];

  constructor(private toastService: ToastService) { }

  ngOnInit() {
    this.toastService.toastState.subscribe((toast: Toast) => {
      this.toasts.push(toast);
      setTimeout(() => this.removeToast(toast), 3000);
    });
  }

  removeToast(toast: Toast) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
