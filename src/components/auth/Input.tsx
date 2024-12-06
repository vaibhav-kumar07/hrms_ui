import React from "react";

interface InputProps {
    label: string;
    type: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

const Input: React.FC<InputProps> = ({
    label,
    type,
    name,
    value,
    onChange,
    error,
}) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-700"
            />
            {error && <div className="text-red-600 text-xs mt-1">{error}</div>}
        </div>
    );
};

export default Input;
