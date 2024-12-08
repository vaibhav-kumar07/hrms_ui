import StatusUpdateDropDown from "../attendance/widgets/StatusUpdateDropDown";
import UpdateTaskInput from "../attendance/widgets/UpdateTask";
import StatusFilterWidget from "../candidate/widgets/StatusFilterWidget";
import { EditEmployeeDialog } from "../employee/widgets/EditEmployeeDialog";
import LeaveStatusUpdateDropDown from "../leave/widgets/LeaveStatusUpdateDropDown";
import { IProfileStatus } from "../types/profile";
import DesignationWidget from "./widgets/Designation";

const widgets: any = {
    editEmployeeWidget: (value: string, rowData: any) => {
        console.log("value", value);
        return (
            <EditEmployeeDialog
                employeeData={rowData}
                // className="bg-yellow-300"
            />
        );
    },
    attendanceStatusUpdateWidget: (value: string, rowData: any) => {
        console.log("value", value);
        return <StatusUpdateDropDown rowData={rowData} />;
    },
    updateTaskInput: (value: string, rowData: any) => {
        return <UpdateTaskInput rowData={rowData} value={value} />;
    },
    statusFilterWidget: (value: string, rowData: any) => {
        return (
            <StatusFilterWidget
                rowData={rowData}
                currentStatus={value as IProfileStatus}
            />
        );
    },
    leaveStatusUpdateDropDown: (value: string, rowData: any) => {
        console.log("value", value);
        return <LeaveStatusUpdateDropDown rowData={rowData} />;
    },

    designationWidget: (value: string, rowData: any) => {
        console.log("value", value);
        return <DesignationWidget rowData={rowData} />;
    },
};

export default function WidgetLibrary({
    widgetName,
    value,
    rowData,
}: {
    widgetName: string;
    value: string;
    rowData?: any;
    className?: string;
}) {
    return widgets[widgetName](value, rowData);
}
