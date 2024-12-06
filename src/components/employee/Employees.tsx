import { useCallback, useEffect, useState } from "react";
import { IProfile } from "../types/profile";
import EmployeesTable from "./EmployeeTable";
import PageHeader from "../common/PageHeader";
import { useTagContext } from "../../context/tagContext";
import { getEmployees } from "../../services/employeeService";
import { useSearchParams } from "react-router-dom";
import { IResponse } from "../types/common";
import Pagination from "../common/pagination/Pagination";
import Employeefilters from "./Employeefilters";
export default function Employees() {
    const { tags } = useTagContext();
    const tag = "employee";
    const [searchParams] = useSearchParams();
    const currentTag = tags[tag];
    const [response, setResponse] = useState<IResponse>();
    const rowsPerPage = searchParams.get("rowsperpage") || 8;
    const page = searchParams.get("page") || 1;
    const position = searchParams.get("position") || "";
    const searchText = searchParams.get("q") || "";

    // Memoize the reloadCandidates function
    const reloadCandidates = useCallback(async () => {
        const result = await getEmployees({
            rowsPerPage: rowsPerPage as number,
            page: page as number,
            position,
            searchText,
        });
        setResponse(result);
    }, [rowsPerPage, page, position, searchText]);

    useEffect(() => {
        reloadCandidates();
    }, [reloadCandidates, currentTag]);

    return (
        <section className="flex flex-col gap-4">
            <PageHeader
                label="Employees"
                className=" px-8 py-5  md:pt-10  md:pb-4 md:px-8 border-b"
            />
            <Employeefilters />
            <EmployeesTable
                employees={response?.data as IProfile[]}
                className="px-8 "
            />
            <Pagination
                className="px-8"
                recordCount={response?.meta.pagination.total as number}
            />
        </section>
    );
}
