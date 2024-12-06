import React, { useState } from "react";
import { IAttendance } from "../../types/attendance"; // Import the enum
import { updateAttendanceTask } from "../../../services/attendanceService";
interface StatusUpdateInputProps {
    rowData: IAttendance;
    value: string;
}

const UpdateTaskInput: React.FC<StatusUpdateInputProps> = ({
    rowData,
    value,
}) => {
    const [task, setTask] = useState(value);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTask(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            updateAttendanceTask({
                id: rowData._id as string,
                task,
            });
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
