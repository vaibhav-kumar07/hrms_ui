import LoginForm from "../components/auth/LoginForm";
import IllustrationSection from "../components/auth/IllustrationSection";
import React from "react";

const LoginPage: React.FC = () => {
    return (
        <div className="flex h-screen bg-gray-100 p-2 md:p-8">
            <LoginForm />
            <IllustrationSection />
        </div>
    );
};

export default LoginPage;
