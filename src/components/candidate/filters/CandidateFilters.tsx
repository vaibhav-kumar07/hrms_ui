import SearchBox from "../../common/SearchBox";
import AddNewCandidateDialog from "../AddNewCandidateDialog";
import CandidateStatusFilter from "./CandidateStatusFilter";
import DesignationFilter from "./DesignationFilter";

export default function CandidateFilters() {
    return (
        <section className="w-full grid grid-cols-1 md:grid-cols-2 px-4 md:px-10  gap-2 md:gap-10">
            <div className="w-full grid grid-cols-2 gap-2 md:gap-2">
                <DesignationFilter />
                <CandidateStatusFilter />
            </div>
            <div className="w-full  flex items-center justify-end gap-2 md:gap-2">
                <div className="w-full">
                    <SearchBox />
                </div>
                <AddNewCandidateDialog className="w-full rounded-3xl  text-xs md:text-sm  px-2 py-4 md:py-5 md:px-10 bg-primary text-primary-foreground   " />
            </div>
        </section>
    );
}
