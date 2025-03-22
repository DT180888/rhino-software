import { EmployeeFaceResponse } from './employee-face-response';

export interface EmployeeResponse {
    id: string;
    companyId: string;
    employeeName: string;
    employeeEmail: string;
    phoneNumber: string;
    status: string;
    position: string;
    employeeFaces: EmployeeFaceResponse[];
  }