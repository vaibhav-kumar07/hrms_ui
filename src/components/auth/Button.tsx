import React from "react";

interface ButtonProps {
    type: "button" | "submit" | "reset";
    text: string;
}

const Button: React.FC<ButtonProps> = ({ type, text }) => {
    return (
        <button
            type={type}
            className="w-full bg-purple-700 text-white py-3 rounded-md hover:bg-purple-800 transition duration-300"
        >
            {text}
        </button>
    );
};

export default Button;
