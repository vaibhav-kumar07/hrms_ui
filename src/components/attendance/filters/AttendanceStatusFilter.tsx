import UrlBasedDropDown from "../../common/UrlBasedDropDown";
import { AttendanceStatusOption } from "../../types/attendance";

export default function AttendanceStatusFilter() {
    return (
        <div className="w-full md:w-2/12">
            <UrlBasedDropDown
                options={AttendanceStatusOption}
                paramKey="status"
                placeholder={`${AttendanceStatusOption[0].label}`}
                className="my-0 w-full md:min-w-fit rounded-3xl px-3 text-xs md:text-sm py-1.5  md:py-3 md:px-8 bg-primary text-primary-foreground "
            />
        </div>
    );
}
