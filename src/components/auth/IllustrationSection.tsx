import React from "react";

const IllustrationSection: React.FC = () => {
    return (
        <div className="hidden md:w-1/2 md:flex flex-col justify-center items-center bg-gradient-to-br from-purple-700 to-blue-600 text-white rounded-r-2xl p-12">
            <div className="bg-white rounded-md shadow-lg p-6 mb-6 w-3/4">
                <div className="flex items-center mb-4">
                    <div className="w-5 h-5 bg-purple-700 rounded-full mr-3"></div>
                    <div className="h-1 w-full bg-gray-300 rounded-full"></div>
                </div>
                <div className="space-y-2">
                    <div className="h-10 bg-gray-200 rounded-md"></div>
                    <div className="h-10 bg-gray-200 rounded-md"></div>
                    <div className="h-20 bg-purple-700 rounded-md"></div>
                </div>
            </div>
            <div className="text-center">
                <h2 className="text-xl font-semibold mb-4">
                    Lorem ipsum dolor sit amet
                </h2>
                <p className="text-sm leading-relaxed">
                    Tempor incididunt ut labore et dolore magna aliqua. Ut enim
                    ad minim veniam.
                </p>
            </div>
        </div>
    );
};

export default IllustrationSection;
