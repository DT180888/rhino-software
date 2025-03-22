export interface EmployeeAccessLogResponse {
    gateID: string;
    employeeFaceID: string;
    employeeID?: string;
    timeSlotID?: string;
    accessGranted: boolean;
    accessType: string;
    timestamp: Date;
  }