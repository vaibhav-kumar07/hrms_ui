import { cn } from "../../utils/cn";
import { formatDateToIST } from "../../utils/date-utils";
import { Label } from "../common/Label";
import { ITableMetadata } from "../common/table/Table";
import TableHeader from "../common/table/TableHeader";
import TableRow from "../common/table/TableRow";
import { IProfile } from "../types/profile";

interface EmployeeTableProps {
    employees: IProfile[];
    className?: string;
}

const employeeMetadata: ITableMetadata[] = [
    {
        columnName: "index",
        headerLabel: "Sr No.",
        sortable: false,
        columnClass: "w-full md:w-[5%] text-left text-muted-foreground md:pl-4",
        cellClass: "w-full md:w-[5%] text-left md:pl-3 ",
    },
    {
        columnName: "name",
        headerLabel: "Name",
        sortable: true,
        defaultSortOrder: "asc",
        columnClass:
            "w-full md:w-[15%] text-left font-semibold text-muted-foreground md:pl-3",
        cellClass: "w-full md:w-[15%] text-left font-semibold md:pl-2",
    },
    {
        columnName: "email",
        headerLabel: "Email",
        sortable: false,
        columnClass: "w-full md:w-[20%] text-left text-muted-foreground ",
        cellClass: "w-full md:w-[20%] text-left truncate ",
    },
    {
        columnName: "phone",
        headerLabel: "Phone Number",
        sortable: false,
        columnClass: "w-full md:w-[15%] text-left text-muted-foreground",
        cellClass: "w-full md:w-[15%] ",
    },
    {
        columnName: "position",
        headerLabel: "Position",
        sortable: false,
        columnClass: "w-full md:w-[15%] text-left text-muted-foreground",
        cellClass: "w-full md:w-[15%] ",
        type: "widget",
        widgetName: "designationWidget",
    },
    {
        columnName: "department",
        headerLabel: "Department",
        sortable: false,
        columnClass: "w-full md:w-[15%] text-left text-muted-foreground",
        cellClass: "w-full md:w-[15%] ",
    },
    {
        columnName: "joining_date",
        headerLabel: "Date of Joining",
        sortable: false,
        columnClass: "w-full md:w-[10%] text-left text-muted-foreground",
        cellClass: "w-full md:w-[10%] ",
    },
    {
        columnName: "Edit",
        type: "widget",
        sortable: false,
        widgetName: "editEmployeeWidget",
        columnClass: "w-full md:w-[10%] text-left text-muted-foreground",
        cellClass: "w-full md:w-[10%] ",
        headerLabel: "Actions",
    },
];

export default function EmployeeTable(props: EmployeeTableProps) {
    return (
        <div
            className={cn(
                "w-full flex flex-col gap-4 md:gap-0 ",
                props.className,
            )}
        >
            <TableHeader
                metadata={employeeMetadata}
                className="border-t text-muted-foreground rounded-t-2xl md:px-0 md:py-4 md:gap-0 bg-primary text-primary-foreground"
            />
            {props.employees?.length ? (
                props.employees.map((employee: IProfile, index: number) => {
                    const formattedJoiningDate = employee.joining_date
                        ? formatDateToIST(employee.joining_date.toString())
                        : "";
                    const data = {
                        ...employee,
                        index: index + 1,
                        joining_date: formattedJoiningDate,
                    };
                    return (
                        <TableRow
                            key={employee._id}
                            data={data}
                            metadata={employeeMetadata}
                            className="w-full border-x-0 border-b-0 px-4 py-2 md:py-2 md:px-0"
                        />
                    );
                })
            ) : (
                <div className="py-2 align-middle mx-auto">
                    <Label className="text-gray-500" variant="semibold">
                        No Data found with the matching criteria
                    </Label>
                </div>
            )}
        </div>
    );
}
