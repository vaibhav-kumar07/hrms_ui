import React, { createContext, useContext, useState, ReactNode } from "react";

type ToastType = "success" | "error";

interface Toast {
    message: string;
    type: ToastType;
}

interface ToastContextProps {
    successToast: (message: string) => void;
    errorToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [toast, setToast] = useState<Toast | null>(null);
    const [visible, setVisible] = useState(false);

    const showToast = (message: string, type: ToastType) => {
        setToast({ message, type });
        setVisible(true);

        // Automatically hide toast after 3 seconds
        setTimeout(() => {
            setVisible(false);
        }, 3000);
    };

    const successToast = (message: string) => showToast(message, "success");
    const errorToast = (message: string) => showToast(message, "error");

    return (
        <ToastContext.Provider value={{ successToast, errorToast }}>
            {children}
            {visible && toast && (
                <div
                    className={`fixed top-5 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg text-white text-center transition-all duration-300 ${
                        toast.type === "success" ? "bg-green-500" : "bg-red-500"
                    }`}
                >
                    {toast.message}
                </div>
            )}
        </ToastContext.Provider>
    );
};

// Custom hook to use the Toast context
export const useToast = (): ToastContextProps => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
};
