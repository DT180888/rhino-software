// update-organization-dialog.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Organization } from 'src/app/core/models/organization.model';

@Component({
  selector: 'app-update-organization-dialog',
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div class="w-full max-w-lg animate-fade-in-down rounded-lg border border-border bg-card shadow-lg">
        <div class="p-6">
          <h2 class="mb-4 text-xl font-semibold text-foreground">Cập nhật tổ chức</h2>

          <form [formGroup]="organizationForm" (ngSubmit)="onSubmit()" class="space-y-4">
            <!-- Same form fields as create-organization-dialog -->
            <div class="space-y-4">
              <!-- Organization Name -->
              <div>
                <label for="organizationName" class="mb-1 block text-sm font-medium text-foreground"
                  >Tên tổ chức *</label
                >
                <input
                  id="organizationName"
                  type="text"
                  formControlName="organizationName"
                  class="w-full rounded-lg border border-border bg-background px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Enter organization name" />
                <div
                  *ngIf="
                    organizationForm.get('organizationName')?.touched &&
                    organizationForm.get('organizationName')?.invalid
                  "
                  class="mt-1 text-sm text-destructive">
                  Tên tổ chức là bắt buộc
                </div>
              </div>

              <!-- Address -->
              <div>
                <label for="address" class="mb-1 block text-sm font-medium text-foreground">Địa chỉ *</label>
                <input
                  id="address"
                  type="text"
                  formControlName="address"
                  class="w-full rounded-lg border border-border bg-background px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Enter address" />
                <div
                  *ngIf="organizationForm.get('address')?.touched && organizationForm.get('address')?.invalid"
                  class="mt-1 text-sm text-destructive">
                  Địa chỉ là bắt buộc
                </div>
              </div>

              <!-- Email -->
              <div>
                <label for="email" class="mb-1 block text-sm font-medium text-foreground">Email *</label>
                <input
                  id="email"
                  type="email"
                  formControlName="email"
                  class="w-full rounded-lg border border-border bg-background px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Enter email" />
                <div
                  *ngIf="organizationForm.get('email')?.touched && organizationForm.get('email')?.invalid"
                  class="mt-1 text-sm text-destructive">
                  Địa chỉ email là bắt buộc
                </div>
              </div>

              <!-- Phone Number -->
              <div>
                <label for="phoneNumber" class="mb-1 block text-sm font-medium text-foreground">Số điện thoại *</label>
                <input
                  id="phoneNumber"
                  type="tel"
                  formControlName="phoneNumber"
                  class="w-full rounded-lg border border-border bg-background px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Enter phone number" />
                <div
                  *ngIf="organizationForm.get('phoneNumber')?.touched && organizationForm.get('phoneNumber')?.errors"
                  class="mt-1 text-sm text-destructive">
                  <span *ngIf="organizationForm.get('phoneNumber')?.errors?.['required']">
                    Số điện thoại là bắt buộc
                  </span>
                  <span *ngIf="organizationForm.get('phoneNumber')?.errors?.['pattern']">
                    Số điện thoại không hợp lệ. Vui lòng nhập số điện thoại bắt đầu bằng số 0 và có 10 chữ số
                  </span>
                </div>
              </div>

              <!-- Tax Code -->
              <div>
                <label for="taxCode" class="mb-1 block text-sm font-medium text-foreground">Mã thuế</label>
                <input
                  id="taxCode"
                  type="text"
                  formControlName="taxCode"
                  class="w-full rounded-lg border border-border bg-background px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Enter tax code" />
              </div>
            </div>

            <div class="flex justify-end space-x-3 border-t border-border pt-4">
              <button
                type="button"
                (click)="onCancel()"
                class="rounded-lg bg-background px-4 py-2 text-muted-foreground transition-colors hover:bg-muted">
                Hủy
              </button>
              <button
                type="submit"
                [disabled]="!organizationForm.valid"
                class="rounded-lg bg-primary px-4 py-2 text-primary-foreground transition-colors disabled:opacity-50 hover:bg-primary/90">
                Cập nhật
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
})
export class UpdateOrganizationDialogComponent implements OnInit {
  @Input() organization!: Organization;
  @Output() dialogClosed = new EventEmitter<Organization | null>();
  organizationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.organizationForm = this.fb.group({
      organizationName: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^0[0-9]{9}$/)]],
      taxCode: [''],
    });
  }

  ngOnInit(): void {
    if (this.organization) {
      this.organizationForm.patchValue(this.organization);
    }
  }

  onSubmit(): void {
    if (this.organizationForm.valid) {
      this.dialogClosed.emit(this.organizationForm.value);
    }
  }

  onCancel(): void {
    this.dialogClosed.emit(null);
  }
}
