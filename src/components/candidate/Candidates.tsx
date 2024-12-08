import { useCallback, useEffect, useState } from "react";
import { IProfileStatus } from "../types/profile";
import { getCandidates } from "../../services/candidateService";
import CandidatesTable from "./CandidatesTable";
import PageHeader from "../common/PageHeader";
import CandidateFilters from "./filters/CandidateFilters";
import { useTagContext } from "../../contexts/TagContext";
import { useSearchParams } from "react-router-dom";
import Pagination from "../common/pagination/Pagination";
import { IResponse } from "../types/common";
import Loader from "../common/Loader";

export default function Candidates() {
    const { clearTag, isTagOn } = useTagContext();
    const [candidates, setCandidates] = useState<IResponse>();
    const [loading, setLoading] = useState<boolean>(true);
    const [searchParams] = useSearchParams();
    const rowsPerPage = searchParams.get("rowsperpage") || 8;
    const page = searchParams.get("page") || 1;
    const position = searchParams.get("position") || "";
    let status = searchParams.get("status") as IProfileStatus;
    const searchText = searchParams.get("q") || "";

    const reloadCandidates = useCallback(async () => {
        setLoading(true);
        try {
            const result = await getCandidates({
                rowsPerPage: rowsPerPage as number,
                page: page as number,
                position,
                status,
                searchText,
            });
            setCandidates(result);
        } catch (error) {
            console.error("Error fetching candidates:", error);
        } finally {
            setLoading(false);
        }
    }, [rowsPerPage, page, status, searchText, position]);

    useEffect(() => {
        if (isTagOn("Candidate")) {
            reloadCandidates().then(() => clearTag("Candidate"));
        } else {
            reloadCandidates();
        }
    }, [reloadCandidates, isTagOn, clearTag]);

    return (
        <section className="flex flex-col gap-4">
            <PageHeader
                label="Candidates"
                className=" px-8 py-5  md:pt-10  md:pb-4 md:px-8 border-b"
            />

            {loading ? (
                <Loader />
            ) : (
                <>
                    <CandidateFilters />
                    <CandidatesTable
                        profiles={candidates?.data}
                        className=" px-8 md:px-8 "
                    />
                    <Pagination
                        className="px-8"
                        recordCount={
                            candidates?.meta.pagination.total as number
                        }
                    />
                </>
            )}
        </section>
    );
}
