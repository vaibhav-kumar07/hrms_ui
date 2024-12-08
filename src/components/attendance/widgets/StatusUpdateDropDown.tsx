import React from "react";
import Dropdown from "../../common/DropDown";
import { AttendanceStatus, IAttendance } from "../../types/attendance"; // Import the enum
import { updateAttendanceStatus } from "../../../services/attendanceService";
import { useToast } from "../../../contexts/ToastContext";

interface StatusUpdateDropDownProps {
    rowData: IAttendance;
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
        updateAttendanceStatus({
            id: rowData._id as string,
            status: newStatus,
        });
        successToast("Employee Status  Updated Successfully");
    };

    return (
        <Dropdown
            options={statusOptions}
            value={rowData.status}
            onChange={(status: string) =>
                handleStatusChange(status as AttendanceStatus)
            }
            className="border shadow-none hover:bg-gray-300 text-xs py-1 px-0"
        />
    );
};

export default StatusUpdateDropDown;
