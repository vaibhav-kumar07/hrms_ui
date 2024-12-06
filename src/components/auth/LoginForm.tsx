import { useState } from "react";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { setCookie } from "../../utils/cookies";
import { loginUser } from "../../services/authService";
import { ErrorType } from "../../utils/errorHandler";

import Button from "./Button";
import Logo from "./Logo";
import Input from "./Input";

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [fieldErrors, setFieldErrors] = useState<
        Array<{ field: string; value: string }>
    >([]);
    const { setToken } = useAuth();
    const [generalError, setGeneralError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const validatedData = loginSchema.parse(formData);
            const result = await loginUser({
                email: validatedData.email,
                password: validatedData.password,
            });
            setToken(result.token);
            setCookie("token", result.token);
            setSuccessMessage("Login successful!");
            setGeneralError(null);
            setFieldErrors([]);
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
        } catch (error: any) {
            if (error instanceof z.ZodError) {
                const validationErrors = error.errors.map((err) => ({
                    field: String(err.path[0]),
                    value: err.message,
                }));
                setFieldErrors(validationErrors);
                setGeneralError(null);
            } else if (error.error_type === ErrorType.VALIDATION_ERROR) {
                setFieldErrors(error.errors || []);
                setGeneralError(null);
            } else if (error.error_type === ErrorType.BUSINESS_ERROR) {
                setGeneralError(error.message);
                setFieldErrors([]);
            } else {
                setGeneralError(error.message || "Something went wrong.");
                setFieldErrors([]);
            }
            setSuccessMessage(null);
        }
    };

    return (
        <div className="w-full flex flex-col justify-center items-center md:w-1/2 bg-white p-8 rounded-3xl md:rounded-l-2xl shadow-md border border-gray-300">
            <div className="relative top-4 left-4">
                <Logo />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Welcome Back!
            </h1>
            {generalError && (
                <div className="text-red-600 text-sm mb-4">{generalError}</div>
            )}
            {successMessage && (
                <div className="text-green-600 text-sm mb-4">
                    {successMessage}
                </div>
            )}
            <form className="space-y-6 w-full px-12" onSubmit={handleSubmit}>
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
                <Button type="submit" text="Login" />
                <p className="text-center text-sm mt-4 text-gray-800">
                    Don't have an account?{" "}
                    <a
                        href="/register"
                        className="text-purple-700 hover:underline"
                    >
                        Register
                    </a>
                </p>
            </form>
        </div>
    );
};

export default LoginForm;
