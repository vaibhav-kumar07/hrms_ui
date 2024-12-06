import React, { FC } from "react";
import { Button } from "../ui/button";
import { cn } from "../../utils/cn";

interface CommonButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    disabled?: boolean;
    loading?: boolean;
    variant?: "secondary" | "destructive" | "outline" | "ghost" | "link";
    size?: "sm" | "lg" | "default" | "icon" | null | undefined;
    type?: "button" | "submit" | "reset" | undefined;
}

const CommonButton: FC<CommonButtonProps> = ({
    children,
    className,
    disabled,
    loading,
    variant,
    size,
    type,
    ...props
}) => {
    return (
        <Button
            className={cn(
                "px-2 h-7 rounded-lg",
                className,
                loading && "opacity-80 cursor-not-allowed",
            )}
            {...props}
            disabled={disabled || loading}
            variant={variant}
            size={size}
            type={type}
        >
            {children}
        </Button>
    );
};

export default CommonButton;
