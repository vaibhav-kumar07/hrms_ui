import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateEmployee } from "../../../services/employeeService";
import { IProfile, positions } from "../../types/profile";
import { useTagContext } from "../../../context/tagContext";
import Dropdown from "../../common/DropDown"; // Import the Dropdown component

const updateEmployeeSchema = z.object({
    fullName: z.string().min(1, "Full Name is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z
        .string()
        .regex(/^\d+$/, "Phone Number must be numeric")
        .min(10, "Phone Number must be at least 10 digits"),
    department: z.string().min(1, "Department is required"),
    position: z.string().min(1, "Position is required"),
});

type UpdateEmployeeFormValues = z.infer<typeof updateEmployeeSchema>;

export default function UpdateEmployeeForm({
    employee,
    onSuccess,
}: {
    employee: IProfile;
    onSuccess: () => void;
}) {
    const { addTag } = useTagContext();
    const tag = "employee";

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<UpdateEmployeeFormValues>({
        resolver: zodResolver(updateEmployeeSchema),
        defaultValues: {
            fullName: employee.name,
            email: employee.email,
            phoneNumber: employee.phone,
            department: employee.department,
            position: employee.position,
        },
    });

    const onSubmit = async (data: UpdateEmployeeFormValues) => {
        const response = await updateEmployee({
            id: employee!._id as string,
            name: data.fullName,
            email: data.email,
            phone: data.phoneNumber,
            department: data.department,
            position: data.position,
        });
        addTag(tag);
        if (response.message) {
            onSuccess();
        }
    };
    const handleDropdownChange = (value: string) => {
        console.log("value: " + value);
        setValue("position", value);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white p-4 rounded-lg max-w-4xl sm:px-10"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4  ">
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Full Name*
                    </label>
                    <input
                        type="text"
                        {...register("fullName")}
                        className={`w-full border-2 rounded-md p-2 ${
                            errors.fullName
                                ? "border-warning"
                                : "border-gray-300"
                        }`}
                        placeholder="Full Name"
                    />
                    {errors.fullName && (
                        <p className="text-sm text-warning">
                            {errors.fullName.message}
                        </p>
                    )}
                </div>
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Email Address*
                    </label>
                    <input
                        type="email"
                        {...register("email")}
                        className={`w-full border-2 rounded-md p-2 ${
                            errors.email ? "border-warning" : "border-gray-300"
                        }`}
                        placeholder="Email Address"
                    />
                    {errors.email && (
                        <p className="text-sm text-warning">
                            {errors.email.message}
                        </p>
                    )}
                </div>
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Phone Number*
                    </label>
                    <input
                        type="text"
                        {...register("phoneNumber")}
                        className={`w-full border-2 rounded-md p-2 ${
                            errors.phoneNumber
                                ? "border-warning"
                                : "border-gray-300"
                        }`}
                        placeholder="Phone Number"
                    />
                    {errors.phoneNumber && (
                        <p className="text-sm text-warning">
                            {errors.phoneNumber.message}
                        </p>
                    )}
                </div>
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Department*
                    </label>
                    <input
                        type="text"
                        {...register("department")}
                        className={`w-full border-2 rounded-md p-2 ${
                            errors.department
                                ? "border-warning"
                                : "border-gray-300"
                        }`}
                        placeholder="Department"
                    />
                    {errors.department && (
                        <p className="text-sm text-warning">
                            {errors.department.message}
                        </p>
                    )}
                </div>
                <div>
                    <label className="block text-sm text-gray-600 mb-1">
                        Position*
                    </label>
                    <Dropdown
                        options={positions}
                        value={employee.position}
                        onChange={handleDropdownChange}
                        error={errors.position?.message}
                    />
                </div>
            </div>
            <button
                type="submit"
                className="w-full  py-2 mt-4 bg-primary text-white rounded-md hover:bg-primary-dark"
            >
                Update
            </button>
        </form>
    );
}
