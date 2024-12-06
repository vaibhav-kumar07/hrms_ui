"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../common/Label";
import { cn } from "../../utils/cn";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    inputId: string;
    defaultValue?: string;
    inputclass?: string;
    labelClass?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({
    label,
    inputId,
    defaultValue,
    onChange,
    ...rest
}: InputFieldProps) => {
    const [value, setValue] = useState<string>(defaultValue || "");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);

        // If onChange prop exists, call it with the new value
        if (onChange) {
            onChange(e);
        }
    };

    return (
        <div className="relative w-full">
            <Input
                {...rest}
                id={inputId}
                value={value}
                onChange={handleChange}
                placeholder=" "
                className={cn(
                    "peer border border-gray-300 rounded-sm px-2 pt-7 pb-5 text-gray-800 placeholder-transparent focus:outline-none focus-visible:ring-1",
                    rest.className,
                )}
            />
            <Label
                className={cn(
                    "absolute left-3 top-4 text-gray-500 text-xs transition-all duration-200 ease-out",
                    "peer-placeholder-shown:text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-500",
                    "peer-focus:top-[1px] peer-focus:text-xs peer-focus:text-gray-700",
                    rest.labelClass,
                )}
                htmlFor={inputId}
            >
                {label}
            </Label>
        </div>
    );
};

export default InputField;
