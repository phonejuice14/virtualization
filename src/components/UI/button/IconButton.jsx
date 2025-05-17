import React from "react";

const IconButton = ({ icon, text, className = "", left = "4", ...props }) => {
    return (
        <button
            className={`relative inline-flex items-center justify-center gap-2 px-4 w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md transition-colors duration-200 ${className}`}
            {...props}
        >
            <span className="absolute" style={{left: `calc(var(--spacing) * ${left})`}}>{icon}</span>

            <span>{text}</span>
        </button>
    );
};

export default IconButton;
