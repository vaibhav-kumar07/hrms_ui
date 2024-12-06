import React from "react";
import AttendanceStatusFilter from "./AttendanceStatusFilter";
import SearchBox from "../common/SearchBox";

export default function AttendanceFilters() {
    return (
        <div className="px-10 flex items-center justify-between gap-4">
            <AttendanceStatusFilter />
            <SearchBox />
        </div>
    );
}
