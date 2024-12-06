import { useNavigate } from "react-router-dom";
import PaginationBar from "./PaginationBar";
import { useURLParams, useGetSearchParamValue } from "../../../hooks/request";
import { cn } from "../../../utils/cn";

export const STARTPAGE = 1;

export default function Pagination({
    recordCount,
    className,
}: {
    recordCount: number;
    className?: string;
}) {
    const navigate = useNavigate();
    const { appendSearchParams } = useURLParams();

    // Get the page number from the query string
    let page = parseInt(useGetSearchParamValue("page", STARTPAGE.toString()));

    // Get the rows per page from the query string
    let rowsPerPage = parseInt(useGetSearchParamValue("rowsperpage", "10"));

    rowsPerPage = rowsPerPage > 50 ? 50 : rowsPerPage;
    page = page > Math.ceil(recordCount / rowsPerPage) ? STARTPAGE : page;

    // Push the user selected page to the query string
    const handleChangePage = (newPage: number) => {
        const newQueryString = appendSearchParams("page", newPage.toString());
        navigate(`?${newQueryString}`);
    };

    // Push the user selected rows per page to the query string
    const handleChangeRowsPerPage = (value: string) => {
        const newQueryString = appendSearchParams("rowsperpage", value);
        navigate(`?${newQueryString}`);
    };

    return (
        <PaginationBar
            className={cn("text-red-bg", className)}
            recordCount={recordCount}
            page={page}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            onPageChange={handleChangePage}
        />
    );
}
