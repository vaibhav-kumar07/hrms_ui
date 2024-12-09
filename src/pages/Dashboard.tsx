import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";

const Dashboard: React.FC = () => {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="w-full flex-grow  overflow-y-auto pl-16 md:pl-60 ">
                <Outlet />
            </main>
        </div>
    );
};

export default Dashboard;
