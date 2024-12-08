export interface ILeave {
    _id?: string;
    name: string;
    date: Date;
    reason: string;
    status: LeaveStatus;
    docs?: Buffer;
}

export enum LeaveStatus {
    ALL = "ALL",
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
}


export const LeavesStatusOption = [
    {
        label: "ALL",
        value: LeaveStatus.ALL
    },
    {
        label: "Pending",
        value: LeaveStatus.PENDING
    },
    {
        label: "Approved",
        value: LeaveStatus.APPROVED
    },
    {
        label: "Rejected",
        value: LeaveStatus.REJECTED
    }
]
export interface LeaveParams {
    page?: number;
    rowsPerPage?: number;
    searchText?: string;
    isActive?: string;
    sortOrder?: string;
    sortColumn?: string;
    status?: LeaveStatus
    position?: string;
    today?: string
}
