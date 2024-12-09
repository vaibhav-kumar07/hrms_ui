import { useCallback, useEffect, useState } from "react";
import { IProfile } from "../types/profile";
import EmployeesTable from "./EmployeeTable";
import PageHeader from "../common/PageHeader";
import { useTagContext } from "../../contexts/TagContext";
import { getEmployees } from "../../services/employeeService";
import { useSearchParams } from "react-router-dom";
import { IResponse } from "../types/common";
import Pagination from "../common/pagination/Pagination";
import Employeefilters from "./Employeefilters";
import Loader from "../common/Loader";
export default function Employees() {
    const { clearTag, isTagOn } = useTagContext();
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [response, setResponse] = useState<IResponse>();
    const rowsPerPage = searchParams.get("rowsperpage") || 8;
    const page = searchParams.get("page") || 1;
    const position = searchParams.get("position") || "";
    const searchText = searchParams.get("q") || "";

    // Memoize the reloadCandidates function
    const reloadEmployees = useCallback(async () => {
        setLoading(true); // Set loading to true before fetching
        try {
            const result = await getEmployees({
                rowsPerPage: rowsPerPage as number,
                page: page as number,
                position,
                searchText,
            });
            setResponse(result);
        } catch (error: any) {
            console.error("Error fetching candidates:", error);
        } finally {
            setLoading(false);
        }
    }, [rowsPerPage, page, position, searchText]);

    const tagIsOn = isTagOn("Employee");
    useEffect(() => {
        reloadEmployees();
    }, [reloadEmployees]);

    useEffect(() => {
        if (tagIsOn || page || position || searchText || rowsPerPage) {
            reloadEmployees().then(() => clearTag("Employee"));
        }
    }, [
        reloadEmployees,
        tagIsOn,
        clearTag,
        rowsPerPage,
        page,
        position,
        searchText,
    ]);

    return (
        <section className="w-full flex flex-col gap-4">
            <PageHeader
                label="Employees"
                className=" px-2 py-5  md:pt-10  md:pb-4 md:px-8 border-b"
            />
            {loading ? (
                <Loader />
            ) : (
                <>
                    <Employeefilters />
                    <EmployeesTable
                        employees={response?.data as IProfile[]}
                        className="px-4 md:px-8 "
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
