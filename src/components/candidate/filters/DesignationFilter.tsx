import UrlBasedDropDown from "../../common/UrlBasedDropDown";
import { positions } from "../../types/profile";

const DesignationFilter = () => {
    return (
        <UrlBasedDropDown
            options={positions}
            paramKey="position"
            className="my-0  rounded-3xl px-3 text-xs md:text-sm py-1.5  md:py-3 md:px-8 bg-primary text-primary-foreground "
            placeholder={`${positions[0].label}`}
            optionClass="bg-white "
        />
    );
};

export default DesignationFilter;
