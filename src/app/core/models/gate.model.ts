export interface Gate {
    gateID: string;
    gateName: string;
    gateStatus: GateStatus;
    price: number;
    model: string;
    lastMaintenanceDate: Date | null;
    totalQuantity: number;
    totalAssigned: number;
    gateAssignments: GateAssignment[];
}

export interface GateAssignment {
    roomId: string;
    roomNumber: string;
    floor: number;
    address: string;
    companyName: string;
    organizationName: string;
    installDate: Date;
    assignedQuantity: number;
    assignedPermissionLevel: string;
    assignedGateDirection: string;
}

export enum GateStatus {
    Active = 'Active',
    Inactive = 'Inactive',
    Maintenance = 'Maintenance'
}

export enum PermissionLevel {
    Basic = 'Basic',
    Advanced = 'Advanced',
    Full = 'Full',
    Retricted = 'Retricted'
}

export enum GateDirection {
    In = 'In',
    Out = 'Out',
    Both = 'Both'
}