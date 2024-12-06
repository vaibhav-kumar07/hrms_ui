import DesignationFilter from "./filters/DesignationFilter";
import SearchBox from "../common/SearchBox";

export default function Employeefilters() {
    return (
        <div className="w-full px-8 flex justify-between items-center gap-4">
            <DesignationFilter />
            <SearchBox />
        </div>
    );
}
