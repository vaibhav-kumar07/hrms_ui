import React, { useState } from "react";
import Dropdown from "../../common/DropDown";
import {
    FormStatusOptions,
    IProfile,
    IProfileStatus,
} from "../../types/profile";
import { updateCandidateStatus } from "../../../services/candidateService";
import { useTagContext } from "../../../contexts/TagContext";
import { ErrorType } from "../../../utils/errorHandler";
import { useToast } from "../../../contexts/ToastContext";

interface StatusFilterWidgetProps {
    rowData: IProfile;
    currentStatus: IProfileStatus;
}

const StatusFilterWidget: React.FC<StatusFilterWidgetProps> = ({
    rowData,
    currentStatus,
}) => {
    const { successToast, errorToast } = useToast();
    const { setTag } = useTagContext();

    const [selectedStatus, setSelectedStatus] = useState(currentStatus || "");
    const [fieldErrors, setFieldErrors] = useState<
        Array<{ field: string; value: string }>
    >([]);

    const handleDropdownChange = async (value: IProfileStatus) => {
        if (value === selectedStatus) return;
        setSelectedStatus(value);
        setFieldErrors([]);
        try {
            await updateCandidateStatus({
                id: rowData._id as string,
                status: value,
            });

            successToast("Candidate status updated successfully");
            setTag("Candidate");
        } catch (error: any) {
            if (error.error_type === ErrorType.VALIDATION_ERROR) {
                setFieldErrors(error.errors || []);
            }
            errorToast("Error updating candidate status");
        }
    };

    return (
        <Dropdown
            className="border shadow-none py-1"
            options={FormStatusOptions}
            value={selectedStatus}
            onChange={(value: string) =>
                handleDropdownChange(value as IProfileStatus)
            }
            error={fieldErrors.find((err) => err.field === "status")?.value}
        />
    );
};

export default StatusFilterWidget;
