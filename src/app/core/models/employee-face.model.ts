import { Guid } from 'guid-typescript';

export interface EmployeeFace {
    id: Guid;
    employeeID: Guid;
    faceImageUrl: string;
    faceData?: string;
    imageHash: string;
    quality: string;
    status: string;
    isTrainedInModel: boolean;
    validFrom: Date;
    validTo: Date;
    createdBy?: string;
    createdDate?: Date;
    lastUpdatedBy?: string;
    lastUpdatedDate?: Date;
    isDeleted?: boolean;
}