import React from "react";
import Dropdown from "../../common/DropDown";
import { ILeave, LeaveStatus } from "../../types/leave";
import { updateLeaveStatus } from "../../../services/leaveService";
import { useToast } from "../../../contexts/ToastContext";

interface LeaveStatusUpdateDropDownProps {
    rowData: ILeave;
}

const LeaveStatusUpdateDropDown: React.FC<LeaveStatusUpdateDropDownProps> = ({
    rowData,
}) => {
    const { successToast } = useToast();
    const statusOptions = Object.keys(LeaveStatus).map((key) => ({
        label: key.replace("_", " ").toUpperCase(),
        value: LeaveStatus[key as keyof typeof LeaveStatus],
    }));

    const handleStatusChange = async (newStatus: LeaveStatus) => {
        try {
            await updateLeaveStatus({
                id: rowData._id as string,
                status: newStatus,
            });
            successToast("Leaves Status Updated Successfully");
        } catch (error) {
            console.error("Error updating leave status", error);
        }
    };

    return (
        <Dropdown
            options={statusOptions}
            value={rowData.status}
            onChange={(status: string) =>
                handleStatusChange(status as LeaveStatus)
            }
            className="border shadow-none hover:bg-gray-300 text-xs py-1 px-0"
        />
    );
};

export default LeaveStatusUpdateDropDown;
