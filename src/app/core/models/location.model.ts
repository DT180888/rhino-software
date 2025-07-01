import { Guid } from 'guid-typescript';

export interface Location {
    id?: Guid;
    companyID: Guid;
    code?: string;
    city: string;
    district: string;
    address: string;
    createdBy?: string;
    createdDate?: Date;
    lastUpdatedBy?: string;
    lastUpdatedDate?: Date;
    isDeleted?: boolean;
}