import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { toast } from 'ngx-sonner';
import { CompanyType } from 'src/app/core/models/company-type.model';
import { Company } from 'src/app/core/models/company.model';
import { Organization } from 'src/app/core/models/organization.model';
import { CompanyTypeService } from 'src/app/core/services/company-type.service';
import { OrganizationService } from 'src/app/core/services/organization.service';

@Component({
  selector: 'app-update-company-dialog',
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div class="w-full max-w-lg animate-fade-in-down rounded-lg border border-border bg-card shadow-lg">
        <div class="p-6">
          <h2 class="mb-4 text-xl font-semibold text-foreground">Cập nhật công ty</h2>

          <form [formGroup]="companyForm" (ngSubmit)="onSubmit()" class="space-y-4">
            <!-- Company Name -->
            <div>
              <label for="companyName" class="mb-1 block text-sm font-medium text-foreground">Tên công ty *</label>
              <input
                type="text"
                id="companyName"
                formControlName="companyName"
                class="w-full rounded-lg border border-border bg-background px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="Enter company name" />
              <div
                *ngIf="companyForm.get('companyName')?.touched && companyForm.get('companyName')?.invalid"
                class="mt-1 text-sm text-destructive">
                Tên công ty là bắt buộc
              </div>
            </div>

            <!-- Organization -->
            <div *ngIf="!organizationId">
              <label for="organization" class="mb-1 block text-sm font-medium text-foreground">Tổ chức *</label>
              <select
                id="organization"
                formControlName="organizationID"
                class="w-full rounded-lg border border-border bg-background px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                <option value="">Chọn tổ chức</option>
                <option *ngFor="let org of organizations" [value]="org.id">
                  {{ org.organizationName }}
                </option>
              </select>
              <div
                *ngIf="companyForm.get('organizationID')?.touched && companyForm.get('organizationID')?.invalid"
                class="mt-1 text-sm text-destructive">
                Tổ chức là bắt buộc
              </div>
            </div>

            <!-- Company Type -->
            <div>
              <label for="companyType" class="mb-1 block text-sm font-medium text-foreground">Loại công ty *</label>
              <select
                id="companyType"
                formControlName="companyTypeID"
                class="w-full rounded-lg border border-border bg-background px-3 py-2 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                <option value="">Chọn loại công ty</option>
                <option *ngFor="let type of companyTypes" [value]="type.id">
                  {{ type.typeName }}
                </option>
              </select>
              <div
                *ngIf="companyForm.get('companyTypeID')?.touched && companyForm.get('companyTypeID')?.invalid"
                class="mt-1 text-sm text-destructive">
                Loại công ty là bắt buộc
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
                [disabled]="!companyForm.valid"
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
export class UpdateCompanyDialogComponent implements OnInit {
  @Input() company!: Company;
  @Output() dialogClosed = new EventEmitter<any>();

  companyForm: FormGroup;
  locationForm: FormGroup;
  companyTypes: CompanyType[] = [];
  organizations: Organization[] = [];
  organizationId?: Guid;

  constructor(
    private fb: FormBuilder,
    private companyTypeService: CompanyTypeService,
    private organizationService: OrganizationService,
  ) {
    this.locationForm = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
    });

    this.companyForm = this.fb.group({
      companyName: ['', Validators.required],
      companyTypeID: ['', Validators.required],
      organizationID: [''],
      location: this.locationForm,
    });
  }

  ngOnInit(): void {
    this.loadCompanyTypes();
    this.organizationId = this.company.organizationID;

    // Initialize form with company data
    if (this.company) {
      this.companyForm.patchValue({
        companyName: this.company.companyName,
        companyTypeID: this.company.companyTypeID,
        organizationID: this.company.organizationID,
      });

      // Initialize location form
      if (this.company.location) {
        this.locationForm.patchValue({
          address: this.company.location.address,
          city: this.company.location.city,
          district: this.company.location.district,
        });
      }
    }

    // Load organizations if needed (for non-organization-specific view)
    if (!this.organizationId) {
      this.loadOrganizations();
    }
  }

  loadOrganizations(): void {
    this.organizationService.getOrganizations().subscribe({
      next: (response) => {
        if (response.success) {
          this.organizations = response.data;
        } else {
          toast.error('Failed to load organizations');
        }
      },
      error: () => {
        toast.error('Failed to load organizations');
      },
    });
  }

  loadCompanyTypes(): void {
    this.companyTypeService.getCompanyTypes().subscribe({
      next: (response) => {
        if (response.success) {
          this.companyTypes = response.data;
        } else {
          toast.error('Failed to load company types');
        }
      },
      error: () => {
        toast.error('Failed to load company types');
      },
    });
  }

  onSubmit(): void {
    if (this.companyForm.valid) {
      const updatedCompany = {
        ...this.companyForm.value,
        id: this.company.id, // Preserve the company ID
      };
      this.dialogClosed.emit(updatedCompany);
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.companyForm.controls).forEach((key) => {
        const control = this.companyForm.get(key);
        control?.markAsTouched();
      });

      // Mark location form fields as touched
      Object.keys(this.locationForm.controls).forEach((key) => {
        const control = this.locationForm.get(key);
        control?.markAsTouched();
      });
    }
  }

  onCancel(): void {
    this.dialogClosed.emit(null);
  }
}
