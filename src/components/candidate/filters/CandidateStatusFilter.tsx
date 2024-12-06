import UrlBasedDropDown from "../../common/UrlBasedDropDown";
import { StatusOptions } from "../../types/profile";
export default function CandidateStatusFilter() {
    return (
        <UrlBasedDropDown
            options={StatusOptions}
            paramKey="status"
            placeholder={`${StatusOptions[0].label}`}
            className="my-0 w-full md:min-w-fit rounded-3xl px-3 text-xs md:text-sm py-1.5  md:py-3 md:px-8 bg-primary text-primary-foreground "
        />
    );
}
