import { Guid } from 'guid-typescript';

export interface CompanyModelResponse {
  id: string;
  companyID: Guid;
  modelName: string;
  version: string;
  modelPath: string;
  status: string;
  trainedDate: string;
  trainingMetrics: string;
  totalFacesCount: number;
  totalEmployeesCount: number;
  createdDate: string;
  isDeleted: boolean;
}
