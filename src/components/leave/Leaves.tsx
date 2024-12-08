import { useCallback, useEffect, useState } from "react";
import PageHeader from "../common/PageHeader";
import { useTagContext } from "../../contexts/TagContext"; // Ensure context is used
import { LeaveStatus } from "../types/leave";
import { getLeaves } from "../../services/leaveService";
import LeavesTable from "./LeaveTable";
import { useSearchParams } from "react-router-dom";
import { IResponse } from "../types/common";
import Pagination from "../common/pagination/Pagination";
import LeavesFilters from "./filters/LeavesFilters";
import Loader from "../common/Loader";

export default function Leaves() {
    const { clearTag, isTagOn } = useTagContext(); // Use context
    const [response, setResponse] = useState<IResponse>();
    const [searchParams] = useSearchParams();
    const rowsPerPage = searchParams.get("rowsperpage") || 8;
    const page = searchParams.get("page") || 1;
    const searchText = searchParams.get("q") || "";
    const status = searchParams.get("status") as LeaveStatus;
    const [loading, setLoading] = useState<boolean>(true);

    const reloadLeaves = useCallback(async () => {
        setLoading(true);
        try {
            const result = await getLeaves({
                rowsPerPage: rowsPerPage as number,
                page: page as number,
                status,
                searchText,
            });
            setResponse(result);
        } catch (error) {
            console.error("Error fetching leaves:", error);
        } finally {
            setLoading(false);
        }
    }, [rowsPerPage, page, status, searchText]);

    useEffect(() => {
        if (isTagOn("Leaves")) {
            reloadLeaves().then(() => clearTag("Leaves"));
        } else {
            reloadLeaves();
        }
    }, [reloadLeaves, isTagOn, clearTag]);

    return (
        <section className="flex flex-col gap-4 ">
            <PageHeader
                label="Leaves"
                className=" px-8 py-5  md:pt-10  md:pb-4 md:px-8 border-b"
            />

            {loading ? (
                <Loader />
            ) : (
                <>
                    <LeavesFilters />
                    <LeavesTable
                        leaveRecords={response?.data}
                        className="px-8"
                    />
                    <Pagination
                        className="px-8"
                        recordCount={response?.meta.pagination.total as number}
                    />
                </>
            )}
        </section>
    );
}
