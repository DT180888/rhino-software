import { EmployeeSchedule } from 'src/app/core/models/employee-schedule.model';
import { EmployeeAccessLogResponse } from './employee-access-log-response';
import { EmployeeFaceResponse } from './employee-face-response';

export interface EmployeeDetailResponse {
  id: string;
  companyId: string;
  employeeName: string;
  employeeEmail: string;
  phoneNumber: string;
  status: string;
  position: string;
  employeeFaces: EmployeeFaceResponse[];
  employeeSchedules: EmployeeSchedule[];
  accessLogs: EmployeeAccessLogResponse[];
}