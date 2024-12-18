import LeavesStatusFilter from "./LeavesStatusFilter";
import SearchBox from "../../common/SearchBox";
import AddNewLeaveDialog from "../AddNewLeaveDialog";

export default function LeavesFilters() {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 px-4 gap-2 md:gap-4">
            <LeavesStatusFilter />
            <div className="grid grid-cols-2 items-center gap-2 md:gap-4">
                <SearchBox />
                <AddNewLeaveDialog className="w-full rounded-3xl  text-xs md:text-sm  px-1.5 md:py-5 md:px-10 bg-primary text-primary-foreground" />
            </div>
        </div>
    );
}
