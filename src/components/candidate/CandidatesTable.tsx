import { cn } from "../../utils/cn";
import { formatDateToIST } from "../../utils/date-utils";
import { Label } from "../common/Label";
import { ITableMetadata } from "../common/table/Table";
import TableHeader from "../common/table/TableHeader";
import TableRow from "../common/table/TableRow";
import { IProfile } from "../types/profile";

interface ProfileManagementTableProps {
    profiles: IProfile[];
    className?: string;
}

const profilesMetadata: ITableMetadata[] = [
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
            "w-full md:w-[10%] text-left font-semibold text-muted-foreground",
        cellClass: "w-full md:w-[10%] text-left font-semibold ",
        // type: "widget",
        // widgetName: "profileName",
    },
    {
        columnName: "email",
        headerLabel: "Email",
        sortable: false,
        columnClass: "w-full md:w-[15%] text-left text-muted-foreground",
        cellClass: "w-full md:w-[15%] text-left ",
    },
    {
        columnName: "phone",
        headerLabel: "Phone",
        sortable: false,
        columnClass: "w-full md:w-[10%] text-left text-muted-foreground",
        cellClass: "w-full md:w-[10%] ",
    },
    {
        columnName: "position",
        headerLabel: "Position",
        sortable: false,
        columnClass: "w-full md:w-[15%] text-left text-muted-foreground",
        cellClass: "w-full md:w-[15%] ",
    },
    {
        columnName: "department",
        headerLabel: "Department",
        sortable: false,
        columnClass: "w-full md:w-[10%] text-left text-muted-foreground",
        cellClass: "w-full md:w-[10%] ",
    },
    {
        columnName: "status",
        headerLabel: "Status",
        sortable: false,
        columnClass:
            "w-full md:w-[15%] md:px-7 text-left text-muted-foreground",
        cellClass: "w-full md:w-[15%]  md:px-7",
        type: "widget",
        widgetName: "statusFilterWidget",
    },
    {
        columnName: "experience",
        headerLabel: "Experience",
        sortable: false,
        columnClass: "w-full md:w-[10%] text-left text-muted-foreground",
        cellClass: "w-full md:w-[10%] ",
        // type: "widget",
        // widgetName: "profileStatusWidget",
    },
    {
        columnName: "resume",
        headerLabel: "Resume",
        sortable: false,
        columnClass: "w-full md:w-[10%] text-left text-muted-foreground",
        cellClass: "w-full md:w-[10%]  overflow-hidden",
        // type: "widget",
        // widgetName: "profileStatusWidget",
    },
];

export default function CandidatesTable(props: ProfileManagementTableProps) {
    return (
        <div
            className={cn(
                "w-full flex flex-col gap-4 md:gap-0 ",
                props.className,
            )}
        >
            <TableHeader
                metadata={profilesMetadata}
                className="border-t text-muted-foreground rounded-t-2xl md:px-0 md:py-4 md:gap-0 bg-primary  text-primary-foreground"
            />
            {props.profiles?.length ? (
                props.profiles.map((profile: IProfile, index: number) => {
                    const formattedJoiningDate = profile.joining_date
                        ? formatDateToIST(profile.joining_date.toString())
                        : "";
                    const data = {
                        ...profile,
                        index: index + 1,
                        joining_date: formattedJoiningDate,
                    };
                    return (
                        <TableRow
                            key={profile._id}
                            data={data}
                            metadata={profilesMetadata}
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