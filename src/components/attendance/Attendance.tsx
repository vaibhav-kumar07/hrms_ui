import { useCallback, useEffect, useState } from "react";
import PageHeader from "../common/PageHeader";
import AttendanceTable from "./AttendanceTable";
import { AttendanceStatus } from "../types/attendance";
import AttendanceFilters from "./filters/AttendanceFilters";
import { useSearchParams } from "react-router-dom";
import { useTagContext } from "../../contexts/TagContext";
import Pagination from "../common/pagination/Pagination";
import { IResponse } from "../types/common";
import Loader from "../common/Loader";
import { getEmployees } from "../../services/employeeService";

export default function Attendences() {
    const { isTagOn, clearTag } = useTagContext();
    const [response, setResponse] = useState<IResponse>();
    const [loading, setLoading] = useState<boolean>(true);
    const [searchParams] = useSearchParams();
    const rowsPerPage = searchParams.get("rowsperpage") || 8;
    const page = searchParams.get("page") || 1;
    const status = searchParams.get("status") || "";
    const searchText = searchParams.get("q") || "";

    const reloadAttendanceRecords = useCallback(async () => {
        setLoading(true);
        try {
            const result = await getEmployees({
                rowsPerPage: rowsPerPage as number,
                page: page as number,
                searchText: searchText as string,
                attendance_status: status as AttendanceStatus,
            });
            setResponse(result);
        } catch (error) {
            console.error("Error fetching candidates:", error);
        } finally {
            setLoading(false);
        }
    }, [rowsPerPage, page, searchText, status]);

    useEffect(() => {
        if (isTagOn("Attendance")) {
            reloadAttendanceRecords().then(() => clearTag("Attendance"));
        } else {
            reloadAttendanceRecords();
        }
    }, [reloadAttendanceRecords, isTagOn, clearTag]);

    return (
        <section className="flex flex-col gap-4 ">
            <PageHeader
                label="Attendances"
                className=" px-8 py-5  md:pt-10  md:pb-4 md:px-8 border-b"
            />

            {loading ? (
                <Loader />
            ) : (
                <>
                    <AttendanceFilters />
                    <AttendanceTable
                        attendanceRecords={response?.data}
                        className="px-8 "
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
