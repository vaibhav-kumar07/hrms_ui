import AttendanceStatusFilter from "../filters/AttendanceStatusFilter";
import SearchBox from "../../common/SearchBox";

export default function AttendanceFilters() {
    return (
        <div className="px-4 md:px-10 flex items-center justify-between gap-4">
            <AttendanceStatusFilter />
            <SearchBox />
        </div>
    );
}
