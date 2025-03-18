import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Order } from 'src/app/core/models/order.model';

@Component({
  selector: 'app-order-details-dialog',
  templateUrl: './order-details-dialog.component.html',
})
export class OrderDetailsDialogComponent {
  /**
   * Order cần hiển thị chi tiết.
   * Bạn có thể mở rộng/truyền thêm dữ liệu khác nếu cần.
   */
  @Input() order!: Order;

  /**
   * Sự kiện đóng dialog.
   * Gọi `this.dialogClosed.emit()` khi người dùng nhấn nút Đóng.
   */
  @Output() dialogClosed = new EventEmitter<void>();

  closeDialog(): void {
    this.dialogClosed.emit();
  }
}
