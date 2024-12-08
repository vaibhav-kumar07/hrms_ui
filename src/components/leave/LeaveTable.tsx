import { cn } from "../../utils/cn";
import { formatDateToIST } from "../../utils/date-utils";
import { Label } from "../common/Label";
import { ITableMetadata } from "../common/table/Table";
import TableHeader from "../common/table/TableHeader";
import TableRow from "../common/table/TableRow";
import { ILeave } from "../types/leave"; // Import the ILeave and LeaveStatus

interface LeaveTableProps {
    leaveRecords: ILeave[];
    className?: string;
}

const leaveMetadata: ITableMetadata[] = [
    {
        columnName: "index",
        headerLabel: "Sr No.",
        sortable: false,
        columnClass:
            "w-full md:w-[10%] text-left text-muted-foreground md:pl-4",
        cellClass: "w-full md:w-[10%] text-left md:pl-3 ",
    },
    {
        columnName: "name",
        headerLabel: "Employee Name",
        sortable: false,
        defaultSortOrder: "asc",
        columnClass:
            "w-full md:w-[20%] text-left font-semibold text-muted-foreground md:pl-3",
        cellClass: "w-full md:w-[20%] text-left font-semibold md:pl-2",
    },
    {
        columnName: "date",
        headerLabel: "Leave Date",
        sortable: false,
        columnClass: "w-full md:w-[20%] text-left text-muted-foreground",
        cellClass: "w-full md:w-[20%] text-left ",
        type: "date",
    },
    {
        columnName: "reason",
        headerLabel: "Reason",
        sortable: false,
        columnClass: "w-full md:w-[25%] text-left text-muted-foreground",
        cellClass: "w-full md:w-[25%] text-left ",
    },
    {
        columnName: "status",
        headerLabel: "Status",
        sortable: false,
        columnClass: "w-full md:w-[15%] text-left text-muted-foreground",
        cellClass: "w-full md:w-[15%] ",
        type: "widget",
        widgetName: "leaveStatusUpdateDropDown",
    },
];

export default function LeavesTable(props: LeaveTableProps) {
    return (
        <div
            className={cn(
                "w-full flex flex-col gap-4 md:gap-0",
                props.className,
            )}
        >
            <TableHeader
                metadata={leaveMetadata}
                className="border-t text-muted-foreground rounded-t-2xl md:px-0 md:py-4 md:gap-0 bg-primary text-primary-foreground"
            />
            {props.leaveRecords?.length ? (
                props.leaveRecords.map((record: ILeave, index: number) => {
                    const fomattedDate = formatDateToIST(
                        record.date.toString(),
                    );
                    const data = {
                        ...record,
                        date: `${fomattedDate}`,
                        index: index + 1,
                    };
                    return (
                        <TableRow
                            key={record._id}
                            data={data}
                            metadata={leaveMetadata}
                            className="w-full border-x-0 border-b-0 px-4 py-2 md:py-1 md:px-0"
                        />
                    );
                })
            ) : (
                <div className="py-2 align-middle mx-auto">
                    <Label className="text-gray-500" variant="semibold">
                        No Leave Records Found
                    </Label>
                </div>
            )}
        </div>
    );
}
