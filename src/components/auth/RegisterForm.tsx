import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import { ErrorType } from "../../utils/errorHandler";
import { z } from "zod";
import Input from "./Input"; // Import Input component
import { setCookie } from "../../utils/cookies";
import Logo from "./Logo";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

const RegisterSchema = z
    .object({
        name: z.string().min(2, "Name must be at least 2 characters long"),
        email: z.string().email("Invalid email address"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters long"),
        confirmPassword: z
            .string()
            .min(8, "Confirm Password must be at least 8 characters long"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const { successToast } = useToast();
    const [fieldErrors, setFieldErrors] = useState<
        Array<{ field: string; value: string }>
    >([]);
    const [generalError, setGeneralError] = useState<string | null>(null);

    const navigate = useNavigate();
    const { setToken } = useAuth();
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setGeneralError(null);
        setFieldErrors([]);
        try {
            RegisterSchema.parse(formData);
        } catch (error) {
            if (error instanceof z.ZodError) {
                const validationErrors = error.errors.map((err) => ({
                    field: String(err.path[0]),
                    value: err.message,
                }));
                setFieldErrors(validationErrors);
                return;
            }
        }

        try {
            const result = await registerUser({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

            successToast("Registration successful!");
            setGeneralError(null);
            setFieldErrors([]);
            setTimeout(() => {
                navigate("/dashboard");
                setCookie("token", result.token);
                setToken(result.token);
            }, 2000);
        } catch (error: any) {
            if (error.error_type === ErrorType.VALIDATION_ERROR) {
                setFieldErrors(error.errors || []);
                setGeneralError(null);
            } else if (error.error_type === ErrorType.BUSINESS_ERROR) {
                setGeneralError(error.message);
                setFieldErrors([]);
            } else {
                setGeneralError(error.message || "Something went wrong.");
                setFieldErrors([]);
            }
        }
    };

    return (
        <div className="w-full h-full flex flex-col justify-center items-center md:w-1/2 bg-white p-10 rounded-3xl md:rounded-l-3xl md:rounded-r-none shadow-md md:border-y md:border-l border-gray-300">
            <div className="relative top-4 left-4">
                <Logo />
            </div>

            <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
                Welcome to Dashboard
            </h1>

            {/* Display General Errors */}
            {generalError && (
                <div className="error-message text-red-600 text-xs mb-4">
                    {generalError}
                </div>
            )}

            <form
                className="w-full register-form grid grid-col-1 gap-4 px-4"
                onSubmit={handleSubmit}
            >
                <Input
                    label="Full Name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={
                        fieldErrors.find((err) => err.field === "name")?.value
                    }
                />
                <Input
                    label="Email Address"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={
                        fieldErrors.find((err) => err.field === "email")?.value
                    }
                />
                <Input
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    error={
                        fieldErrors.find((err) => err.field === "password")
                            ?.value
                    }
                />
                <Input
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    error={
                        fieldErrors.find(
                            (err) => err.field === "confirmPassword",
                        )?.value
                    }
                />
                <button
                    type="submit"
                    className="btn-primary mt-4 w-full py-3 bg-purple-700 text-white rounded-md text-lg font-semibold transition duration-200 ease-in-out hover:bg-purple-800"
                >
                    Register
                </button>
                <p className="mt-4 text-center text-gray-800">
                    Already have an account?{" "}
                    <a
                        href="/login"
                        className="text-purple-700 hover:underline"
                    >
                        Login
                    </a>
                </p>
            </form>
        </div>
    );
};

export default RegisterPage;
