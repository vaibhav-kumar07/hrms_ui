import React from "react";
import Dropdown from "../../common/DropDown";
import { ILeave, LeaveStatus } from "../../types/leave";
import { useTagContext } from "../../../context/tagContext";
import { updateLeaveStatus } from "../../../services/leaveService";

interface LeaveStatusUpdateDropDownProps {
    rowData: ILeave;
}

const LeaveStatusUpdateDropDown: React.FC<LeaveStatusUpdateDropDownProps> = ({
    rowData,
}) => {
    const { addTag } = useTagContext();
    const tag = "leave";
    const statusOptions = Object.keys(LeaveStatus).map((key) => ({
        label: key.replace("_", " ").toUpperCase(),
        value: LeaveStatus[key as keyof typeof LeaveStatus],
    }));

    const handleStatusChange = (newStatus: LeaveStatus) => {
        updateLeaveStatus({
            id: rowData._id as string,
            status: newStatus,
        });
        addTag(tag);
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
