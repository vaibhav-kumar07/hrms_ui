import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useURLParams, useGetSearchParamValue } from "../../hooks/request";
import { cn } from "../../utils/cn";

interface DropdownProps {
    options: { label: string; value: string }[];
    paramKey: string;
    className?: string;
    optionClass?: string;
    placeholder?: string;
}

const UrlBasedDropdown: React.FC<DropdownProps> = ({
    options,
    paramKey,
    className,
    optionClass,
    placeholder,
}) => {
    const navigate = useNavigate();
    const { appendSearchParams } = useURLParams();

    const defaultValue = useGetSearchParamValue(paramKey);
    const [selectedValue, setSelectedValue] = useState(defaultValue || "");
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setSelectedValue(defaultValue || "");
    }, [defaultValue]);

    const handleDropdownToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionSelect = (value: string) => {
        setSelectedValue(value);
        const newQueryString = appendSearchParams(paramKey, value);
        navigate(`?${newQueryString}`, { replace: true });
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <div ref={dropdownRef} className="relative w-full">
            {/* Button to open dropdown */}
            <button
                onClick={handleDropdownToggle}
                className={cn(
                    "w-full mt-1 border border-gray-300 shadow-md rounded-lg px-4 md:px-0 py-3 md:py-0 text-sm font-medium bg-white flex justify-between items-center focus:ring-2 focus:ring-blue-400 focus:outline-none transition duration-200 ease-in-out",
                    className,
                )}
            >
                {selectedValue
                    ? options.find((option) => option.value === selectedValue)
                          ?.label
                    : placeholder}
                <span className="ml-2 text-sm text-gray-600">
                    {isOpen ? "▲" : "▼"}
                </span>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute  min-w-full  mt-1 bg-white shadow-lg rounded-lg border border-gray-300 z-10">
                    <ul className="max-h-screen">
                        {options.map((option) => (
                            <li
                                key={option.value}
                                onClick={() => handleOptionSelect(option.value)}
                                className={cn(
                                    "py-3 px-4 hover:bg-purple-100 hover:text-primary cursor-pointer transition duration-150 ease-in-out rounded-md",
                                    optionClass,
                                )}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UrlBasedDropdown;
