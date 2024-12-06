import { cn } from "../../utils/cn";
import { formatDateToIST } from "../../utils/date-utils";
import { Label } from "../common/Label";
import { ITableMetadata } from "../common/table/Table";
import TableHeader from "../common/table/TableHeader";
import TableRow from "../common/table/TableRow";
import { IAttendance } from "../types/attendance";

interface AttendanceTableProps {
    attendanceRecords: IAttendance[];
    className?: string;
}

const attendanceMetadata: ITableMetadata[] = [
    {
        columnName: "index",
        headerLabel: "Sr No.",
        sortable: false,
        columnClass: "w-full md:w-[5%] text-left text-muted-foreground md:pl-4",
        cellClass: "w-full md:w-[5%] text-left md:pl-3 ",
    },
    {
        columnName: "employeeName",
        headerLabel: "Employee Name",
        sortable: false,
        defaultSortOrder: "asc",
        columnClass:
            "w-full md:w-[15%] text-left font-semibold text-muted-foreground md:pl-3",
        cellClass: "w-full md:w-[15%] text-left font-semibold md:pl-2",
    },
    {
        columnName: "designation",
        headerLabel: "Designation",
        sortable: false,
        columnClass: "w-full md:w-[15%] text-left text-muted-foreground",
        cellClass: "w-full md:w-[15%] text-left ",
    },
    {
        columnName: "department",
        headerLabel: "Department",
        sortable: false,
        columnClass: "w-full md:w-[10%] text-left text-muted-foreground",
        cellClass: "w-full md:w-[10%] ",
    },
    {
        columnName: "task",
        headerLabel: "Task",
        sortable: false,
        columnClass:
            "w-full md:w-[35%] text-left text-muted-foreground md:px-2",
        cellClass: "w-full md:w-[35%]  md:px-2",
        type: "widget",
        widgetName: "updateTaskInput",
    },
    {
        columnName: "status",
        headerLabel: "Status",
        sortable: false,
        columnClass: "w-full md:w-[15%] text-left text-muted-foreground",
        cellClass: "w-full md:w-[15%] ",
        type: "widget",
        widgetName: "attendanceStatusUpdateWidget",
    },
];

export default function AttendanceTable(props: AttendanceTableProps) {
    return (
        <div
            className={cn(
                "w-full flex flex-col gap-4 md:gap-0  ",
                props.className,
            )}
        >
            <TableHeader
                metadata={attendanceMetadata}
                className="border-t text-muted-foreground rounded-t-2xl md:px-0 md:py-4 md:gap-0 bg-primary text-primary-foreground"
            />
            {props.attendanceRecords?.length ? (
                props.attendanceRecords.map(
                    (record: IAttendance, index: number) => {
                        const data = {
                            ...record,
                            index: index + 1,
                        };
                        return (
                            <TableRow
                                key={record._id}
                                data={data}
                                metadata={attendanceMetadata}
                                className="w-full border-x-0 border-b-0 px-4 py-2 md:py-2 md:px-0"
                            />
                        );
                    },
                )
            ) : (
                <div className="py-2 align-middle mx-auto">
                    <Label className="text-gray-500" variant="semibold">
                        No Attendance Records Found
                    </Label>
                </div>
            )}
        </div>
    );
}
