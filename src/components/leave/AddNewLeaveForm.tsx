import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { leaveSchema } from "../validation-schema/LeaveSchema";
import { positions } from "../types/profile"; // Ensure 'positions' array is correctly imported
import { addNewLeave } from "../../services/leaveService";
import { useTagContext } from "../../context/tagContext";
import Dropdown from "../common/DropDown"; // Import the Dropdown component

type LeaveFormValues = z.infer<typeof leaveSchema>;

export default function AddNewLeaveForm({
    onSuccess,
}: {
    onSuccess: () => void;
}) {
    const { addTag } = useTagContext();
    const tag = "leaves";

    const [generalError, setGeneralError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm<LeaveFormValues>({
        resolver: zodResolver(leaveSchema),
    });

    const onSubmit = async (data: LeaveFormValues) => {
        setGeneralError(null);

        try {
            const gmtDate = new Date(data.date).toISOString();
            await addNewLeave({
                name: data.name,
                date: gmtDate,
                position: data.position,
                reason: data.reason,
            });

            addTag(tag);
            setSuccessMessage("Leave Added Successfully");
            onSuccess();
            reset();
        } catch (error: any) {
            setGeneralError("Something went wrong.");
        }
    };

    const handleDropdownChange = (value: string) => {
        // This will update the selected position in the form state
        setValue("position", value);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-4 rounded-lg shadow-lg max-w-3xl sm:px-8"
        >
            {generalError && (
                <p className="text-sm text-warning text-center mb-4">
                    {generalError}
                </p>
            )}
            {successMessage && (
                <p className="text-sm text-green-500 text-center mb-4">
                    {successMessage}
                </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                {/* Name */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Name*
                    </label>
                    <input
                        type="text"
                        {...register("name")}
                        className={`w-full border-2 rounded-md p-2 ${
                            errors.name ? "border-warning" : "border-gray-300"
                        }`}
                        placeholder="Enter your name"
                    />
                    {errors.name && (
                        <p className="text-sm text-warning py-0 my-0 text-start pl-1">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                {/* Date */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Date*
                    </label>
                    <input
                        type="date"
                        {...register("date")}
                        className={`w-full border-2 rounded-md p-2 ${
                            errors.date ? "border-warning" : "border-gray-300"
                        }`}
                    />
                    {errors.date && (
                        <p className="text-sm text-warning py-0 my-0 text-start pl-1">
                            {errors.date.message}
                        </p>
                    )}
                </div>

                {/* Position Dropdown */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Position*
                    </label>
                    <Dropdown
                        options={positions}
                        value={""} // Initially empty, can be set based on any existing data if needed
                        onChange={handleDropdownChange}
                        error={errors.position?.message}
                    />
                    {errors.position && (
                        <p className="text-sm text-warning py-0 my-0 text-start pl-1">
                            {errors.position.message}
                        </p>
                    )}
                </div>

                {/* Reason */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Reason*
                    </label>
                    <textarea
                        {...register("reason")}
                        className={`w-full border-2 rounded-md p-2 ${
                            errors.reason ? "border-warning" : "border-gray-300"
                        }`}
                        placeholder="Enter reason for leave"
                        rows={3}
                    />
                    {errors.reason && (
                        <p className="text-sm text-warning py-0 my-0 text-start pl-1">
                            {errors.reason.message}
                        </p>
                    )}
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary-dark mt-4"
            >
                Submit
            </button>
        </form>
    );
}
