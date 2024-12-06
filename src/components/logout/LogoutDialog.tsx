import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../context/authContext";
import { setCookie } from "../../utils/cookies";

export function LogoutConfirmationDialog({
    className,
}: {
    className?: string;
}) {
    const { setToken } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const dialogRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const handleDialogClose = () => {
        setIsOpen(false);
    };

    const handleDialogOpen = () => {
        setIsOpen(true);
    };

    const handleLogout = () => {
        setToken("");
        setCookie("token", "");
        navigate("/login");
    };

    // Handle outside clicks to close the dialog
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dialogRef.current &&
                !dialogRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    return (
        <>
            <button
                onClick={handleDialogOpen}
                className=" px-10 mt-1 flex items-center gap-3 text-gray-400 font-medium transition-colors "
            >
                <FaSignOutAlt size={18} />
                <span>Log out</span>
            </button>
            {isOpen && (
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogContent
                        className="max-w-[100%] sm:rounded-3xl md:max-w-md bg-white p-0 overflow-hidden"
                        ref={dialogRef}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <DialogHeader className="bg-primary text-primary-foreground">
                            <DialogTitle>
                                <h2 className="text-xl text-center font-semibold py-4">
                                    Confirm Logout
                                </h2>
                            </DialogTitle>
                        </DialogHeader>
                        <div className="p-6">
                            <p className="text-gray-600 mb-6">
                                Are you sure you want to log out? This will
                                delete your session token and redirect you to
                                the login page.
                            </p>
                            <div className="flex justify-end gap-4">
                                <button
                                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                                    onClick={handleDialogClose}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}

export default LogoutConfirmationDialog;
