// company-details-dialog.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Company } from 'src/app/core/models/company.model';

@Component({
  selector: 'app-company-details-dialog',
  templateUrl: './company-details-dialog.component.html',
})
export class CompanyDetailsDialogComponent {
  @Input() company!: Company;
  @Input() organizationName: string = '';
  @Input() companyTypeName: string = '';
  @Output() dialogClosed = new EventEmitter<void>();

  closeDialog(): void {
    this.dialogClosed.emit();
  }
}
