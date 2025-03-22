import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Organization } from 'src/app/core/models/organization.model';

@Component({
  selector: 'app-organization-details-dialog',
  templateUrl: './organization-details-dialog.component.html',
})
export class OrganizationDetailsDialogComponent {
  @Input() organization!: Organization;
  @Output() dialogClosed = new EventEmitter<void>();

  closeDialog(): void {
    this.dialogClosed.emit();
  }
}
