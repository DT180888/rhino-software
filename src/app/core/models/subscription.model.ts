import { Guid } from 'guid-typescript';
import { CompanyType } from './company-type.model';

export interface Subscription {
  companyTypeID?: string;
  id?: Guid;
  createdBy?: string;
  createdDate?: Date;
  lastUpdatedBy?: string;
  lastUpdatedDate?: Date;
  isDeleted?: boolean;
  subscriptionName: string;
  subscriptionDescription: string;
  deviceCount: number;
  basePrice: number;
  minEmployees: number;
  maxEmployees: number;
  durationMonths: number;
  packageType: string;
  subscriptionType: string;
  description?: string;
  code?: string;
  companyType?: CompanyType;
  features?: string[];
  CompanyId?: Guid;
  OrganizationId?: Guid;
}
