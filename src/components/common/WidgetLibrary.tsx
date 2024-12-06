import StatusUpdateDropDown from "../attendance/widgets/StatusUpdateDropDown";
import UpdateTaskInput from "../attendance/widgets/UpdateTask";
import StatusFilterWidget from "../candidate/widgets/StatusFilterWidget";
import { EditEmployeeDialog } from "../employee/widgets/EditEmployeeDialog";
import LeaveStatusUpdateDropDown from "../leave/widgets/LeaveStatusUpdateDropDown";
import { IProfile, IProfileStatus } from "../types/profile";

const widgets: any = {
    editEmployeeWidget: (value: string, rowData: any) => {
        return (
            <EditEmployeeDialog
                employeeData={rowData}
                // className="bg-yellow-300"
            />
        );
    },
    attendanceStatusUpdateWidget: (value: string, rowData: any) => {
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
        return <LeaveStatusUpdateDropDown rowData={rowData} />;
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