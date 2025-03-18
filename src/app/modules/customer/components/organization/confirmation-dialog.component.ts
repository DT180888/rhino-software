import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div class="w-full max-w-md animate-fade-in-down rounded-lg border border-border bg-card shadow-lg">
        <div class="p-6">
          <h2 class="mb-4 text-xl font-semibold text-foreground">{{ title }}</h2>
          <p class="mb-6 text-muted-foreground">{{ message }}</p>

          <div class="flex justify-end space-x-3">
            <button
              type="button"
              (click)="onCancel()"
              class="rounded-lg bg-background px-4 py-2 text-muted-foreground transition-colors hover:bg-muted">
              Hủy
            </button>
            <button
              type="button"
              (click)="onConfirm()"
              class="rounded-lg bg-destructive px-4 py-2 text-destructive-foreground transition-colors hover:bg-destructive/90">
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class ConfirmationDialogComponent {
  @Input() title: string = 'Confirm Action';
  @Input() message: string = 'Are you sure you want to proceed?';
  @Output() dialogClosed = new EventEmitter<boolean>();

  onConfirm(): void {
    this.dialogClosed.emit(true);
  }

  onCancel(): void {
    this.dialogClosed.emit(false);
  }
}
