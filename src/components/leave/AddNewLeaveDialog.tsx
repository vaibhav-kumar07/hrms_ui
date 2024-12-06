import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { cn } from "../../utils/cn";
import CommonButton from "../common/Button";
import AddNewLeaveForm from "./AddNewLeaveForm";

export default function AddNewLeaveDialog({
    className,
}: {
    className?: string;
}) {
    const [isOpen, setIsOpen] = useState(false);

    const handleDialogClose = () => {
        setIsOpen(false);
    };

    const handleDialogOpen = () => {
        setIsOpen(true);
    };

    return (
        <>
            <CommonButton
                variant="outline"
                className={cn(
                    "bg-primary hover:bg-primary text-white rounded-3xl flex h-8 px-6 gap-1",
                    className,
                )}
                onClick={handleDialogOpen}
            >
                Add New Leave
            </CommonButton>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-[100%] rounded-3xl sm:rounded-3xl md:max-w-3xl bg-white overflow-hidden">
                    <DialogHeader className="bg-primary text-primary-foreground">
                        <DialogTitle>
                            <h2 className="text-xl text-center font-semibold py-4">
                                Add New Leave
                            </h2>
                        </DialogTitle>
                    </DialogHeader>
                    <AddNewLeaveForm onSuccess={handleDialogClose} />
                </DialogContent>
            </Dialog>
        </>
    );
}
