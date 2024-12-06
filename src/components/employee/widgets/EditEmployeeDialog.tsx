import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "../../ui/dialog";
import { DialogHeader } from "../../ui/dialog";
import UpdateEmployeeForm from "./EditEmployeeDetails";
import { IProfile } from "../../types/profile";
import { Pencil } from "lucide-react";
import React, { useRef, useEffect } from "react";

export function EditEmployeeDialog({
    className,
    employeeData,
}: {
    className?: string;
    employeeData: IProfile;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const dialogRef = useRef<HTMLDivElement>(null);

    const handleDialogClose = () => {
        setIsOpen(false);
    };

    const handleDialogOpen = () => {
        setIsOpen(true);
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
            <Pencil
                size={10}
                className="w-5 h-5 text-primary cursor-pointer"
                onClick={handleDialogOpen}
            />
            {isOpen && (
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogContent
                        className="max-w-[100%] sm:rounded-3xl md:max-w-3xl bg-white p-0 overflow-hidden"
                        ref={dialogRef}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <DialogHeader className="bg-primary text-primary-foreground">
                            <DialogTitle>
                                <h2 className="text-xl text-center font-semibold py-4">
                                    Update Employee Details
                                </h2>
                            </DialogTitle>
                        </DialogHeader>
                        <UpdateEmployeeForm
                            employee={employeeData}
                            onSuccess={handleDialogClose}
                        />
                    </DialogContent>
                </Dialog>
            )}
        </>
    );
}
