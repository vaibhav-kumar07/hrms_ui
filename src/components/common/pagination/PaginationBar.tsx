import { ChevronLeft, ChevronRight } from "lucide-react";
import { Label } from "../../common/Label";
import { cn } from "../../../utils/cn";

export interface PaginationBarProps {
    className?: string;
    page: number;
    rowsPerPage: number;
    recordCount: number;
    onPageChange: (newPage: number) => void;
    onRowsPerPageChange: (value: string) => void;
}

export const STARTPAGE = 1;

export default function PaginationBar(props: PaginationBarProps) {
    const page = props.page;
    const startRecord = (props.page - 1) * props.rowsPerPage + 1;
    let endRecord = startRecord + props.rowsPerPage - 1;
    endRecord = endRecord > props.recordCount ? props.recordCount : endRecord;

    const totalPages = Math.ceil(props.recordCount / props.rowsPerPage);

    return (
        <div
            className={cn(
                "flex gap-4 justify-end align-middle items-center  py-4 ",
                props.className,
            )}
        >
            <div>
                <Label size={"sm"}>
                    {startRecord}-{endRecord} of {props.recordCount}
                </Label>
            </div>
            <PageArrows
                page={page}
                totalPages={totalPages}
                onPageChange={props.onPageChange}
            />
        </div>
    );
}

const PageArrows = ({ page, totalPages, onPageChange }: any) => {
    const hasMorePages = page < totalPages;
    const hasPreviousPages = page > STARTPAGE;
    return (
        <div className="flex">
            {hasPreviousPages && (
                <button
                    className="cursor-pointer"
                    onClick={() => onPageChange(page - 1)}
                >
                    <ChevronLeft className="h-6 w-6 text-slate-700" />
                </button>
            )}
            {!hasPreviousPages && (
                <ChevronLeft className="h-6 w-6 text-slate-400" />
            )}
            {hasMorePages && (
                <button
                    className="cursor-pointer"
                    onClick={() => onPageChange(page + 1)}
                >
                    <ChevronRight className="h-6 w-6 text-slate-700" />
                </button>
            )}
            {!hasMorePages && (
                <ChevronRight className="h-6 w-6 text-slate-400" />
            )}
        </div>
    );
};
