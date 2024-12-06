import UrlBasedDropDown from "../../common/UrlBasedDropDown";
import { positions } from "../../types/profile";

const DesignationFilter = () => {
    return (
        <div className="w-full md:w-2/12">
            <UrlBasedDropDown
                options={positions}
                paramKey="position"
                className="my-0  rounded-3xl px-3 text-xs md:text-sm py-1.5  md:py-3 md:px-8 bg-primary text-primary-foreground "
                placeholder={`${positions[0].label}`}
                optionClass="bg-white "
            />
        </div>
    );
};

export default DesignationFilter;
