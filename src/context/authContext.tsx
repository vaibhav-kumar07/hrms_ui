import React, { createContext, useContext, useState, ReactNode } from "react";
import { getCookieValue, setCookie } from "../utils/cookies";

interface AuthContextProps {
    token: string | null;
    setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [token, setTokenState] = useState<string | null>(
        getCookieValue("token"),
    );

    const setToken = (newToken: string | null) => {
        if (newToken) {
            setCookie("token", newToken);
        }
        setTokenState(newToken);
    };

    return (
        <AuthContext.Provider value={{ token, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};
