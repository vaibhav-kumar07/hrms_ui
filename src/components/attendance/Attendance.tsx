import { useEffect, useState, useCallback } from "react";
import PageHeader from "../common/PageHeader";
import AttendanceTable from "./AttendanceTable";
import { getAllAttenanceRecords } from "../../services/attendanceService";
import { AttendanceStatus } from "../types/attendance";
import AttendanceFilters from "./AttendanceFilters";
import { useSearchParams } from "react-router-dom";
import { useTagContext } from "../../context/tagContext";
import Pagination from "../common/pagination/Pagination";
import { IResponse } from "../types/common";

export default function Attendences() {
    const { tags } = useTagContext();
    const tag = "attendance";
    const [response, setResponse] = useState<IResponse>();
    const currentTag = tags[tag];
    const [searchParams] = useSearchParams();
    // Extract query parameters from the URL
    const rowsPerPage = searchParams.get("rowsperpage") || 8;
    const page = searchParams.get("page") || 1;
    const status = searchParams.get("status") || "";
    const searchText = searchParams.get("q") || "";

    // Use useCallback to memoize the function
    const reloadCandidates = useCallback(async () => {
        const result = await getAllAttenanceRecords({
            rowsPerPage: rowsPerPage as number,
            page: page as number,
            status: status as AttendanceStatus,
        });
        setResponse(result);
    }, [rowsPerPage, page, status]);

    useEffect(() => {
        reloadCandidates();
    }, [reloadCandidates, currentTag, searchText]); // Added reloadCandidates in the dependency array

    return (
        <section className="flex flex-col gap-4 ">
            <PageHeader
                label="Attendances"
                className=" px-8 py-5  md:pt-10  md:pb-4 md:px-8 border-b"
            />
            <AttendanceFilters />
            <AttendanceTable
                attendanceRecords={response?.data}
                className="px-8 "
            />
            <Pagination
                className="px-8"
                recordCount={response?.meta.pagination.total as number}
            />
        </section>
    );
}
