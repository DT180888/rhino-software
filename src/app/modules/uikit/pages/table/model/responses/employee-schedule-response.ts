export interface EmployeeScheduleResponse {
  employeeID: string;
  timestamp: Date;
  workingHours: number;
  scheduleType: string;
}