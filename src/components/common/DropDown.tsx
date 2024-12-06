import { cn } from "../../utils/cn";
import React, { useRef, useState } from "react";

interface DropdownProps {
    options: { label: string; value: string }[];
    value: string;
    onChange: (value: string) => void;
    error?: string;
    className?: string;
    optionClass?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
    options,
    value,
    onChange,
    error,
    className,
    optionClass,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLSelectElement | null>(null);

    const [selectedValue, setSelectedValue] = useState(
        value || options[0].value,
    );
    console.log("open", isOpen);
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
        setSelectedValue(e.target.value);
    };

    return (
        <div className="relative w-full">
            {/* Dropdown List */}

            <select
                ref={selectRef}
                value={selectedValue}
                onChange={handleChange}
                className={cn(
                    " left-0 w-full mt-1 bg-white border border-gray-300 shadow-lg rounded-md z-10 px-2 py-3",
                    className,
                )}
                onBlur={() => setIsOpen(true)}
            >
                {options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                        className={cn("p-2", optionClass)}
                    >
                        {option.label}
                    </option>
                ))}
            </select>

            {/* Error Message */}
            {error && <p className="text-sm text-warning mt-1">{error}</p>}
        </div>
    );
};

export default Dropdown;
