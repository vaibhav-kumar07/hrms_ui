import React from "react";
import Dropdown from "../../common/DropDown";
import { AttendanceStatus } from "../../types/attendance";
import { useToast } from "../../../contexts/ToastContext";
import { IProfile } from "../../../components/types/profile";
import { updateEmployeeAttendanceStatus } from "../../../services/employeeService";

interface StatusUpdateDropDownProps {
    rowData: IProfile;
}

const StatusUpdateDropDown: React.FC<StatusUpdateDropDownProps> = ({
    rowData,
}) => {
    const { successToast } = useToast();

    const statusOptions = Object.keys(AttendanceStatus).map((key) => ({
        label: key.replace("_", " ").toUpperCase(),
        value: AttendanceStatus[key as keyof typeof AttendanceStatus],
    }));

    const handleStatusChange = (newStatus: AttendanceStatus) => {
        updateEmployeeAttendanceStatus({
            id: rowData._id as string,
            status: newStatus,
        });
        successToast("Employee Status  Updated Successfully");
    };

    return (
        <Dropdown
            options={statusOptions}
            value={rowData.attendance_status as AttendanceStatus}
            onChange={(status: string) =>
                handleStatusChange(status as AttendanceStatus)
            }
            className="border shadow-none hover:bg-gray-300 text-xs py-1 px-0"
        />
    );
};

export default StatusUpdateDropDown;
