import React, { useEffect, useState } from "react";
import Dropdown from "../../common/DropDown";
import {
    FormStatusOptions,
    IProfile,
    IProfileStatus,
} from "../../types/profile";
import { updateCandidateStatus } from "../../../services/candidateService";
import { useTagContext } from "../../../context/tagContext";
import { ErrorType } from "../../../utils/errorHandler";

interface StatusFilterWidgetProps {
    rowData: IProfile;
    currentStatus: IProfileStatus;
}

const StatusFilterWidget: React.FC<StatusFilterWidgetProps> = ({
    rowData,
    currentStatus,
}) => {
    console.log("rowdata", rowData);
    const { addTag } = useTagContext();
    const tag = "candidate";
    const [selectedStatus, setSelectedStatus] = useState(currentStatus || "");
    const [fieldErrors, setFieldErrors] = useState<
        Array<{ field: string; value: string }>
    >([]);

    function handleDropdownChange(value: IProfileStatus) {
        setSelectedStatus(value);
    }

    useEffect(() => {
        const handleUpdateService = async () => {
            setFieldErrors([]);
            setSelectedStatus(selectedStatus);

            try {
                await updateCandidateStatus({
                    id: rowData._id as string,
                    status: selectedStatus,
                });
                addTag(tag);
            } catch (error: any) {
                if (error.error_type === ErrorType.VALIDATION_ERROR) {
                    setFieldErrors(error.errors || []);
                }
            }
        };

        if (currentStatus !== selectedStatus) {
            handleUpdateService();
        }
    }, [selectedStatus, currentStatus, rowData._id]);

    return (
        <Dropdown
            className="border shadow-none py-1"
            options={FormStatusOptions}
            value={selectedStatus}
            onChange={(selectedStatus: string) =>
                handleDropdownChange(selectedStatus as IProfileStatus)
            }
            error={fieldErrors.find((err) => err.field === "status")?.value}
        />
    );
};

export default StatusFilterWidget;
