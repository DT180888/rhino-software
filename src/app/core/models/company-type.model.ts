import { Guid } from 'guid-typescript';

export interface CompanyType {
    id?: Guid;
    typeName: string;
    createdBy?: string;
    createdDate?: Date;
    lastUpdatedBy?: string;
    lastUpdatedDate?: Date;
    isDeleted?: boolean;
    code?: string;
}