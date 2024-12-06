import { useEffect, useState, useCallback } from "react";
import PageHeader from "../common/PageHeader";
import { useTagContext } from "../../context/tagContext";
import { LeaveStatus } from "../types/leave";
import { getLeaves } from "../../services/leaveService";
import LeavesTable from "./LeaveTable";
import { useSearchParams } from "react-router-dom";
import { IResponse } from "../types/common";
import Pagination from "../common/pagination/Pagination";
import LeavesFilters from "./filters/LeavesFilters";

export default function Leaves() {
    const { tags } = useTagContext();
    const tag = "leaves";
    const [response, setResponse] = useState<IResponse>();
    const [searchParams] = useSearchParams();
    const rowsPerPage = searchParams.get("rowsperpage") || 8;
    const page = searchParams.get("page") || 1;
    const searchText = searchParams.get("q") || "";
    const status = searchParams.get("status") as LeaveStatus;

    const currentTag = tags[tag];

    // Memoize the reloadCandidates function
    const reloadCandidates = useCallback(async () => {
        const result = await getLeaves({
            rowsPerPage: rowsPerPage as number,
            page: page as number,
            status,
            searchText,
        });
        setResponse(result);
    }, [rowsPerPage, page, status, searchText]);

    useEffect(() => {
        reloadCandidates();
    }, [reloadCandidates, currentTag]);

    return (
        <section className="flex flex-col gap-4 ">
            <PageHeader
                label="Leaves"
                className=" px-8 py-5  md:pt-10  md:pb-4 md:px-8 border-b"
            />
            <LeavesFilters />
            <LeavesTable leaveRecords={response?.data} className="px-8" />
            <Pagination
                className="px-8"
                recordCount={response?.meta.pagination.total as number}
            />
        </section>
    );
}
