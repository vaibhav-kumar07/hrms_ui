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
import LeaveList from "./LeaveList/LeaveList";

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
        <section className="flex flex-col gap-4">
            <PageHeader
                label="Leaves"
                className="px-4 py-5 md:pt-8 md:pb-4 md:px-8 border-b"
            />

            {loading ? (
                <Loader />
            ) : (
                <section className="h-full flex flex-col gap-4 px-2 md:px-8">
                    {/* Leave Filters Section */}
                    <section className="flex justify-between items-center gap-4">
                        <LeavesFilters />
                    </section>

                    {/* Main Content Section */}
                    <section className="flex flex-col md:flex-row gap-8">
                        {/* Leave Table Section */}
                        <article className="flex-1">
                            <LeavesTable
                                leaveRecords={response?.data}
                                className="w-full"
                            />

                            {/* Pagination Section */}
                            <section className="mt-4">
                                <h2 className="sr-only">Pagination</h2>
                                <Pagination
                                    className="w-full"
                                    recordCount={
                                        response?.meta.pagination
                                            .total as number
                                    }
                                />
                            </section>
                        </article>

                        {/* Leave List Section */}
                        <aside className="md:w-1/3 h-full">
                            <LeaveList />
                        </aside>
                    </section>
                </section>
            )}
        </section>
    );
}
