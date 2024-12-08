import { AttendanceStatus } from "./attendance";


export interface IProfile {
    _id?: string;
    name: string;
    email: string;
    phone: string;
    position: string;
    department: string;
    experience?: string;
    resume?: Buffer;
    img?: string;
    status?: IProfileStatus;
    joining_date?: Date;
    role: IProfileRole
    task?: string;
    attendance_status?: AttendanceStatus;
}
export enum IProfileRole {
    candidate = 'CANDIDATE',
    employee = 'EMPLOYEE',
}

export enum IProfileStatus {
    All = "ALL",
    New = "NEW",
    Scheduled = "SCHEDULED",
    Selected = "SELECTED",
    rejected = "REJECTED"
}


export const positions = [
    { value: "ALL", label: "All" },
    { value: "INTERN", label: "Intern" },
    { value: "FULL_TIME", label: "FullTime" },
    { value: "JUNIOR", label: "Junior" },
    { value: "SENIOR", label: "Senior" },
    { value: "TEAM_LEAD", label: "TeamLead" },
];

export const StatusOptions = [
    {
        value: "ALL", label: "All"
    },
    {
        value: IProfileStatus.New, label: "New"
    }, {
        value: IProfileStatus.Scheduled, label: "Scheduled"
    },
    {
        value: IProfileStatus.Selected, label: "Selected"
    },
    {
        value: IProfileStatus.rejected, label: "Rejected"
    }
]

export const FormStatusOptions = [

    {
        value: IProfileStatus.New, label: "New"
    }, {
        value: IProfileStatus.Scheduled, label: "Scheduled"
    },
    {
        value: IProfileStatus.Selected, label: "Selected"
    },
    {
        value: IProfileStatus.rejected, label: "Rejected"
    }
]


export interface CandidateParams {
    page?: number;
    rowsPerPage?: number;
    searchText?: string;
    isActive?: string;
    sortOrder?: string;
    sortColumn?: string;
    status?: IProfileStatus
    position?: string;
    attendance_status?: AttendanceStatus

}
