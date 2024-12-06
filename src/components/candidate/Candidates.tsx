import { useEffect, useState, useCallback } from "react";
import { IProfileStatus } from "../types/profile";
import { getCandidates } from "../../services/candidateService";
import CandidatesTable from "./CandidatesTable";
import PageHeader from "../common/PageHeader";
import CandidateFilters from "./filters/CandidateFilters";
import { useTagContext } from "../../context/tagContext";
import { useSearchParams } from "react-router-dom";
import Pagination from "../common/pagination/Pagination";
import { IResponse } from "../types/common";

export default function Candidates() {
    const { tags } = useTagContext();
    const tag = "candidate";
    const [candidates, setCandidates] = useState<IResponse>();
    const [searchParams] = useSearchParams();
    const currentTag = tags[tag];
    // Extract query parameters from the URL
    const rowsPerPage = searchParams.get("rowsperpage") || 8;
    const page = searchParams.get("page") || 1;
    const position = searchParams.get("position") || "";
    let status = searchParams.get("status") as IProfileStatus;
    const searchText = searchParams.get("q") || "";

    // Use useCallback to memoize the function
    const reloadCandidates = useCallback(async () => {
        const result = await getCandidates({
            rowsPerPage: rowsPerPage as number,
            page: page as number,
            position,
            status,
            searchText,
        });
        setCandidates(result);
    }, [rowsPerPage, page, position, status, searchText]);

    useEffect(() => {
        reloadCandidates();
    }, [reloadCandidates, currentTag]); // Added reloadCandidates in the dependency array

    return (
        <section className="flex flex-col gap-4">
            <PageHeader
                label="Candidates"
                className=" px-8 py-5  md:pt-10  md:pb-4 md:px-8 border-b"
            />
            <CandidateFilters />
            <CandidatesTable
                profiles={candidates?.data}
                className=" px-8 md:px-8 "
            />
            <Pagination
                className="px-8"
                recordCount={candidates?.meta.pagination.total as number}
            />
        </section>
    );
}
