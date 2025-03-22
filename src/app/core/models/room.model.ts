/* eslint-disable @typescript-eslint/naming-convention */
import { Guid } from 'guid-typescript';

export interface RoomResponse {
    id: Guid;
    locationID: Guid;
    companyID: Guid;
    organizationID: Guid;
    roomNumber: string;
    description: string;
    roomType: RoomType;
    capacity: number;
    floor: string;
}

export interface RoomRequest {
    companyID: string;
    roomNumber: string;
    description: string;
    roomType: RoomType;
    capacity: number;
    floor: string;
}

export interface RoomPagedRequest {
    pageNumber: number;
    pageSize: number;
    sortBy?: string;
    sortDirection?: 'asc' | 'desc';
    searchTerm?: string;
    companyId: Guid;
}

export enum RoomType {
    OFFICE = 'OFFICE',
    MEETING = 'MEETING'
}