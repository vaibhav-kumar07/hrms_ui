import DesignationFilter from "./filters/DesignationFilter";
import SearchBox from "../common/SearchBox";

export default function Employeefilters() {
    return (
        <div className="px-4 md:px-10 flex items-center justify-between gap-1 md:gap-4">
            <DesignationFilter />
            <SearchBox />
        </div>
    );
}
