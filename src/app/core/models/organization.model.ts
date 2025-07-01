import { Guid } from 'guid-typescript';
import { Company } from './company.model';

export interface Organization {
    id?: Guid;
    code?: string;
    userID?: string;
    status?: string;
    address: string;
    email: string;
    phoneNumber: string;
    taxCode?: string;
    organizationName: string;
    createdBy?: string;
    createdDate?: Date;
    lastUpdatedBy?: string;
    lastUpdatedDate?: Date;
    isDeleted?: boolean;
    companies: Company[];
}