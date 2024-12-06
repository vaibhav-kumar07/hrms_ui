import { useEffect, useState } from "react";
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

    // Extract query parameters from the URL
    const rowsPerPage = searchParams.get("rowsperpage") || 8;
    const page = searchParams.get("page") || 1;
    const position = searchParams.get("position") || "";
    let status = searchParams.get("status") as IProfileStatus;
    const searchText = searchParams.get("q") || "";
    // const sortOrder = searchParams.get("sortOrder") || "desc";
    // const sortColumn = searchParams.get("sortColumn") || "created_at";
    // const status = searchParams.get("status") || "";

    const reloadCandidates = async () => {
        const result = await getCandidates({
            rowsPerPage: rowsPerPage as number,
            page: page as number,
            position,
            status,
            searchText,
        });
        setCandidates(result);
    };

    useEffect(() => {
        // Initial fetch of candidates
        reloadCandidates();
    }, [tags[tag], page, rowsPerPage, position, status, searchText]);

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
