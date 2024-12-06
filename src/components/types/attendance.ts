export interface IAttendance {
    _id?: string;
    employeeName: string;
    designation: string;
    department: string;
    task: string;
    status: AttendanceStatus;
}

export enum AttendanceStatus {
    ALL = "ALL",
    PRESENT = 'PRESENT',
    ABSENT = 'ABSENT',
    WORK_FROM_HOME = 'WORK_FROM_HOME',
    MEDICAL_LEAVE = 'MEDICAL_LEAVE',
}

export const FormAttendanceStatusOption = [
    {
        label: "Present",
        value: AttendanceStatus.PRESENT
    },
    {
        label: "Absent",
        value: AttendanceStatus.ABSENT
    },
    {
        label: "Medical Leave",
        value: AttendanceStatus.MEDICAL_LEAVE
    },
    {
        label: "Work From Home",
        value: AttendanceStatus.WORK_FROM_HOME
    }
]
export const AttendanceStatusOption = [
    {
        label: "ALL",
        value: AttendanceStatus.ALL
    },
    {
        label: "Present",
        value: AttendanceStatus.PRESENT
    },
    {
        label: "Absent",
        value: AttendanceStatus.ABSENT
    },
    {
        label: "Medical Leave",
        value: AttendanceStatus.MEDICAL_LEAVE
    },
    {
        label: "Work From Home",
        value: AttendanceStatus.WORK_FROM_HOME
    }
]
export interface AttendanceParams {
    page?: number;
    rowsPerPage?: number;
    searchText?: string;
    isActive?: string;
    sortOrder?: string;
    sortColumn?: string;
    status?: AttendanceStatus
    position?: string;
}
