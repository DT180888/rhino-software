import { Guid } from 'guid-typescript';
import { EmployeeDetailResponse } from 'src/app/modules/uikit/pages/table/model/responses/employee-detail-response';

export interface AccessLog {
    id: Guid,
    gateID: string,
    companyId: string,
    employeeFaceId: Guid,
    employeeId: Guid,
    accessGranted: boolean,
    accessType: string,
    timestamp: Date,
    employee: EmployeeDetailResponse
}