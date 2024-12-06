import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addNewCandidate } from "../../services/candidateService";
import { useTagContext } from "../../context/tagContext";
import Dropdown from "../common/DropDown";
import { positions } from "../types/profile";

const addCandidateSchema = z.object({
    fullName: z.string().min(1, "Full Name is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z
        .string()
        .regex(/^\d+$/, "Phone Number must be numeric")
        .min(10, "Phone Number must be at least 10 digits"),
    department: z.string().min(1, "Department is required"),
    position: z.string().min(1, "Position is required"),
    experience: z
        .string()
        .regex(/^\d+$/, "Experience must be numeric")
        .min(1, "Experience is required"),
    declaration: z
        .boolean()
        .refine((val) => val, "You must accept the declaration"),
});

type AddCandidateFormValues = z.infer<typeof addCandidateSchema>;

export default function AddCandidateForm({
    onSuccess,
}: {
    onSuccess: () => void;
}) {
    const { addTag } = useTagContext();
    const tag = "candidate";

    const [fieldErrors, setFieldErrors] = useState<
        Array<{ field: string; value: string }>
    >([]);
    const [generalError, setGeneralError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<AddCandidateFormValues>({
        resolver: zodResolver(addCandidateSchema),
    });

    const onSubmit = async (data: AddCandidateFormValues) => {
        setGeneralError(null);
        setFieldErrors([]);

        try {
            addCandidateSchema.parse(data);
            const response = await addNewCandidate({
                name: data.fullName,
                email: data.email,
                phone: data.phoneNumber,
                department: data.department,
                experience: Number(data.experience),
                position: data.position,
            });

            addTag(tag);
            if (response) {
                onSuccess();
            }
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                const validationErrors = error.errors.map((err) => ({
                    field: String(err.path[0]),
                    value: err.message,
                }));
                setFieldErrors(validationErrors);
            } else if (error.error_type === "VALIDATION_ERROR") {
                setFieldErrors(error.errors || []);
                setGeneralError(null);
            } else if (error.error_type === "BUSINESS_ERROR") {
                setGeneralError(error.message);
                setFieldErrors([]);
            } else {
                setGeneralError(error.message || "Something went wrong.");
                setFieldErrors([]);
            }
        }
    };

    const handleDropdownChange = (value: string) => {
        setValue("position", value);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-4 rounded-lg shadow-lg max-w-3xl sm:px-8 mx-auto"
        >
            {generalError && (
                <p className="text-sm text-warning text-center mb-4">
                    {generalError}
                </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 items-center ">
                {/* Full Name */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Full Name*
                    </label>
                    <input
                        type="text"
                        {...register("fullName")}
                        className={`w-full border-2 rounded-md p-2 bg-gray-100 ${
                            errors.fullName ||
                            fieldErrors.find((err) => err.field === "fullName")
                                ? "border-warning"
                                : "border-gray-300"
                        }`}
                        placeholder="Full Name"
                    />
                    {fieldErrors.find((err) => err.field === "fullName") && (
                        <p className="text-sm text-warning py-0 my-0 text-start pl-1">
                            {
                                fieldErrors.find(
                                    (err) => err.field === "fullName",
                                )?.value
                            }
                        </p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Email Address*
                    </label>
                    <input
                        type="email"
                        {...register("email")}
                        className={`w-full border-2 rounded-md p-2 ${
                            errors.email ||
                            fieldErrors.find((err) => err.field === "email")
                                ? "border-warning"
                                : "border-gray-300"
                        }`}
                        placeholder="Email Address"
                    />
                    {fieldErrors.find((err) => err.field === "email") && (
                        <p className="text-sm text-warning py-0 my-0 text-start pl-1">
                            {
                                fieldErrors.find((err) => err.field === "email")
                                    ?.value
                            }
                        </p>
                    )}
                </div>

                {/* Phone Number */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Phone Number*
                    </label>
                    <input
                        type="text"
                        {...register("phoneNumber")}
                        className={`w-full border-2 rounded-md p-2 ${
                            errors.phoneNumber ||
                            fieldErrors.find(
                                (err) => err.field === "phoneNumber",
                            )
                                ? "border-warning"
                                : "border-gray-300"
                        }`}
                        placeholder="Phone Number"
                    />
                    {fieldErrors.find((err) => err.field === "phoneNumber") && (
                        <p className="text-sm text-warning py-0 my-0 text-start pl-1">
                            {
                                fieldErrors.find(
                                    (err) => err.field === "phoneNumber",
                                )?.value
                            }
                        </p>
                    )}
                </div>

                {/* Department */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Department*
                    </label>
                    <input
                        type="text"
                        {...register("department")}
                        className={`w-full border-2 rounded-md p-2 ${
                            errors.department ||
                            fieldErrors.find(
                                (err) => err.field === "department",
                            )
                                ? "border-warning"
                                : "border-gray-300"
                        }`}
                        placeholder="Department"
                    />
                    {fieldErrors.find((err) => err.field === "department") && (
                        <p className="text-sm text-warning py-0 my-0 text-start pl-1">
                            {
                                fieldErrors.find(
                                    (err) => err.field === "department",
                                )?.value
                            }
                        </p>
                    )}
                </div>

                {/* Position */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Position*
                    </label>
                    <Dropdown
                        options={positions}
                        value={""}
                        onChange={handleDropdownChange}
                        error={
                            fieldErrors.find((err) => err.field === "position")
                                ?.value
                        }
                    />
                </div>

                {/* Experience */}
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Experience*
                    </label>
                    <input
                        type="text"
                        {...register("experience")}
                        className={`w-full border-2 rounded-md p-2 ${
                            errors.experience ||
                            fieldErrors.find(
                                (err) => err.field === "experience",
                            )
                                ? "border-warning"
                                : "border-gray-300"
                        }`}
                        placeholder="Experience (in years)"
                    />
                    {fieldErrors.find((err) => err.field === "experience") && (
                        <p className="text-sm text-warning py-0 my-0 text-start pl-1">
                            {
                                fieldErrors.find(
                                    (err) => err.field === "experience",
                                )?.value
                            }
                        </p>
                    )}
                </div>
            </div>

            {/* Declaration */}
            <div className="w-full grid grid-cols-12 items-center py-3">
                <input
                    type="checkbox"
                    {...register("declaration")}
                    className={`w-full ${
                        errors.declaration ? "border-warning" : ""
                    }`}
                />
                <p className="col-span-11 text-sm text-gray-600 my-0">
                    I hereby declare that the above information is true to the
                    best of my knowledge and belief.
                </p>
            </div>
            {fieldErrors.find((err) => err.field === "declaration") && (
                <p className="text-sm text-warning py-0 my-0 text-start pl-6">
                    {
                        fieldErrors.find((err) => err.field === "declaration")
                            ?.value
                    }
                </p>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
            >
                Save
            </button>
        </form>
    );
}
