import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { cn } from "../../utils/cn";
import CommonButton from "../common/Button";
import AddCandidateForm from "./AddNewCandidateForm";

export default function AddNewCandidateDialog({
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
                    " bg-primary hover:bg-primary text-white rounded-3xl flex h-8 px-6 gap-1",
                    className,
                )}
                onClick={handleDialogOpen}
            >
                Add New Candidate
            </CommonButton>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className=" rounded-3xl sm:rounded-3xl md:max-w-3xl bg-white overflow-hidden ">
                    <DialogHeader className="bg-primary text-primary-foreground">
                        <DialogTitle>
                            <h2 className="text-xl text-center font-semibold py-4">
                                Add New Candidate
                            </h2>
                        </DialogTitle>
                    </DialogHeader>
                    <AddCandidateForm onSuccess={handleDialogClose} />
                </DialogContent>
            </Dialog>
        </>
    );
}
