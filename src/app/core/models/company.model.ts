import { Guid } from 'guid-typescript';
import { Location } from './location.model';
import { Order } from './order.model';
export interface Company {
  id?: Guid;
  code?: string;
  organizationID: Guid;
  companyTypeID: Guid;
  companyName: string;
  createdBy?: string;
  createdDate?: Date;
  lastUpdatedBy?: string;
  lastUpdatedDate?: Date;
  isDeleted?: boolean;
  location: Location;
  orders?: Order[];
}