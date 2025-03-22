import { Guid } from 'guid-typescript';

export interface EmployeeFaceResponse {
    id: Guid;
    employeeID: Guid;
    faceImageURL: string;
    faceData?: string;
    imageHash: string;
    quality: string;
    status: string;
    isTrainedInModel: boolean;
    validFrom: Date;
    validTo: Date;
    createdDate?: Date;
    updatedDate?: Date;
    createdBy?: string;
    updatedBy?: string;
  }