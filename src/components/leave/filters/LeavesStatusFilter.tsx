import UrlBasedDropDown from "../../common/UrlBasedDropDown";
import { StatusOptions } from "../../types/profile";
import { LeavesStatusOption } from "../../types/leave";

export default function LeavesStatusFilter() {
    return (
        <div className="w-full md:w-2/6">
            <UrlBasedDropDown
                options={LeavesStatusOption}
                paramKey="status"
                placeholder={`${StatusOptions[0].label}`}
                className="my-0 w-full md:min-w-fit rounded-3xl px-3 text-xs md:text-sm py-1.5  md:py-3 md:px-8 bg-primary text-primary-foreground "
            />
        </div>
    );
}
