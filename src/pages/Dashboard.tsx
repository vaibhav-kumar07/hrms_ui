import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";

const Dashboard: React.FC = () => {
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <main className="flex-grow  overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default Dashboard;
