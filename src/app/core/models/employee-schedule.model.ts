/* eslint-disable @typescript-eslint/naming-convention */
export interface EmployeeSchedule {
    scheduleID: string;
    employeeID: string;
    locationID: string;
    locationAddress?: string;
    timestamp: Date;
    startTime: string;
    endTime: string;
    startDate?: Date | null;
    endDate?: Date | null;
    title: string;
    scheduleType: ScheduleType;
    isDeleted: boolean;
}

export interface CreateEmployeeScheduleRequest {
    employeeID: string;
    timestamp: Date;
    startTime: string; // Format "HH:mm:ss"
    endTime: string;   // Format "HH:mm:ss"
    startDate?: Date | null;
    endDate?: Date | null;
    title: string;
    scheduleType: ScheduleType;
}

export interface UpdateEmployeeScheduleRequest {
    timestamp: Date;
    startTime: string; // Format "HH:mm:ss"
    endTime: string;   // Format "HH:mm:ss"
    startDate?: Date | null;
    endDate?: Date | null;
    title: string;
    scheduleType: ScheduleType;
}

export enum ScheduleType {
    REGULAR = 'REGULAR',
    OVERTIME = 'OVERTIME',
    TEMPORARY = 'TEMPORARY'
}