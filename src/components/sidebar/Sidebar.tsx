import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserFriends, FaChartBar, FaClipboardList } from "react-icons/fa";
import { Label } from "../common/Label";
import LogoutConfirmationDialog from "../logout/LogoutDialog";

const Sidebar: React.FC = () => {
    const location = useLocation();

    return (
        <aside className="w-[250px] bg-white flex flex-col h-screen shadow-lg border-r">
            {/* Logo Section */}
            <Link to="/dashboard" className="flex items-center gap-3 mb-8 p-5">
                <div className="w-10 h-10 rounded-md border-4 border-primary"></div>
                <span className="text-xl font-semibold text-primary">LOGO</span>
            </Link>

            {/* Navigation Menu */}
            <nav className="">
                {/* Recruitment Section */}
                <Label
                    // variant={"semibold"}
                    className="text-gray-400 mb-3 md:px-10"
                >
                    Recruitment
                </Label>
                <ul className="space-y-2 mb-6">
                    <SidebarLink
                        to="/dashboard"
                        icon={<FaUserFriends />}
                        text="Candidates"
                        isActive={location.pathname === "/dashboard"}
                    />
                </ul>

                {/* Organization Section */}
                <Label
                    // variant={"semibold"}
                    className="text-gray-400 mb-3 md:px-10"
                >
                    Organization
                </Label>
                <ul className="space-y-2 mb-6">
                    <SidebarLink
                        to="/dashboard/employees"
                        icon={<FaUserFriends />}
                        text="Employees"
                        isActive={location.pathname === "/dashboard/employees"}
                    />
                    <SidebarLink
                        to="/dashboard/attendance"
                        icon={<FaChartBar />}
                        text="Attendance"
                        isActive={location.pathname === "/dashboard/attendance"}
                    />
                    <SidebarLink
                        to="/dashboard/leaves"
                        icon={<FaClipboardList />}
                        text="Leaves"
                        isActive={location.pathname === "/dashboard/leaves"}
                    />
                </ul>

                <Label
                    // variant={"semibold"}
                    className="text-gray-400 mb-7 md:px-10"
                >
                    Others
                </Label>
                <LogoutConfirmationDialog />
            </nav>
        </aside>
    );
};

const SidebarLink: React.FC<{
    to: string;
    icon: React.ReactNode;
    text: string;
    isActive: boolean;
}> = ({ to, icon, text, isActive }) => {
    return (
        <li className="w-full grid grid-cols-12">
            <div
                className={`w-1/2 h-full rounded-r-lg ${
                    isActive ? "bg-primary" : "bg-transparent"
                }`}
            ></div>
            <Link
                to={to}
                className={`col-span-11 flex items-center gap-3 text-base p-2 pl-5 w-full transition-all ${
                    isActive
                        ? "text-primary font-semibold"
                        : "text-black hover:text-primary"
                }`}
            >
                {icon}
                {text}
            </Link>
        </li>
    );
};

export default Sidebar;
