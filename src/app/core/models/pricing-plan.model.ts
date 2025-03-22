import { Guid } from 'guid-typescript';
import { Feature } from './feature.model';

export interface PricingPlan {
  id: Guid;
  tier: string;
  price: string;
  period: string;
  description: string;
  features: Feature[];
  buttonText: string;
  isPopular?: boolean;
  orderPriority?: number;
  companyId?: Guid;
  organizationId?: Guid;
}

export interface PricingTableData {
  tier: string;
  price: string;
  period: string;
  features: string[];
  orderPriority?: number;
}
