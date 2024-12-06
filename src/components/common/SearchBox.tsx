import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useURLParams, useGetSearchParamValue } from "../../hooks/request";
import { Input } from "../ui/input";
import { cn } from "../../utils/cn";
import { X } from "lucide-react";

interface SearchBoxProps {
    placeholder?: string;
    className?: string;
}

export default function SearchBox(props: SearchBoxProps) {
    const [searchQuery, setSearchQuery] = useState(""); // State for the input
    const [error, setError] = useState(false); // State for error display
    const navigate = useNavigate();
    const searchText = useGetSearchParamValue("q", ""); // Hook to get the "q" search param
    const { appendSearchParams, removeSearchParams } = useURLParams(); // Hooks for managing query params

    const handleSearch = () => {
        if (searchQuery.trim() === "") {
            setError(true);
            return;
        }

        setError(false); // Clear error
        const newUrl = appendSearchParams("q", searchQuery); // Add "q" param
        navigate(`?${newUrl}`); // Navigate to the updated URL
    };

    useEffect(() => {
        setSearchQuery(searchText); // Update state when "q" param changes
    }, [searchText]);

    const clearSearch = () => {
        setError(false);
        setSearchQuery(""); // Clear the search query
        const newUrl = removeSearchParams("q"); // Remove the "q" param
        navigate(newUrl);
    };

    const errorClass = error
        ? "border-red-500 animate-shake"
        : "border-primary-500";

    return (
        <div className={`relative flex items-center max-w-xl `}>
            {/* Input Box (always open) */}
            <Input
                className={cn(
                    `transition-all duration-300 active:outline-none focus:outline-none focus-visible:ring-primary flex-1 md:h-[40px] px-3 h-8 border rounded-3xl w-full `,
                    errorClass,
                )}
                type="text"
                placeholder={props.placeholder || "Search..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyUp={(event) => {
                    if (event.key === "Enter") {
                        handleSearch();
                    }
                }}
            />
            {/* Clear Icon */}
            <ClearIcon searchText={searchQuery} onClick={clearSearch} />
        </div>
    );
}

function ClearIcon({
    searchText,
    onClick,
}: {
    searchText: string;
    onClick: () => void;
}) {
    return (
        <>
            {searchText && (
                <div className="absolute right-2 pr-6 cursor-pointer text-primary-500">
                    <X size={16} onClick={onClick} />
                </div>
            )}
        </>
    );
}
