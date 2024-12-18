import React, { useState } from "react";
import { IAttendance } from "../../types/attendance";
import { useToast } from "../../../contexts/ToastContext";
import { updateEmployeeTask } from "../../../services/employeeService";
interface StatusUpdateInputProps {
    rowData: IAttendance;
    value: string;
}

const UpdateTaskInput: React.FC<StatusUpdateInputProps> = ({
    rowData,
    value,
}) => {
    const { successToast } = useToast();
    const [task, setTask] = useState(value);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            updateEmployeeTask({
                id: rowData._id as string,
                task,
            });
            successToast("Employee Task Updated Successfully");
        }
    };

    return (
        <div className="relative w-full">
            <input
                type="text"
                value={task}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress} //
                className="w-full mt-1 bg-white border px-2 py-1 text-sm"
                placeholder="Enter task" //
            />
        </div>
    );
};

export default UpdateTaskInput;
