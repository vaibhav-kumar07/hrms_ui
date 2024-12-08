import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserFriends, FaChartBar, FaClipboardList } from "react-icons/fa";
import { Label } from "../common/Label";
import LogoutConfirmationDialog from "../logout/LogoutDialog";

const Sidebar: React.FC = () => {
    const location = useLocation();

    return (
        <aside
            className="h-screen bg-white shadow-lg border-r transition-all 
                       w-14 md:w-60 flex flex-col"
        >
            {/* Logo Section */}
            <Link
                to="/dashboard"
                className="flex items-center justify-center md:justify-start gap-3 mb-8 py-5 md:p-5"
            >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-md border-4 border-primary"></div>
                <span className="hidden md:block text-xl font-semibold text-primary">
                    LOGO
                </span>
            </Link>

            {/* Navigation Menu */}
            <nav className="flex-1">
                {/* Recruitment Section */}
                <Label className="hidden md:block text-gray-400 mb-3 md:px-10">
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
                <Label className="hidden md:block text-gray-400 mb-3 md:px-10">
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

                {/* Others Section */}
                <Label className="hidden md:block text-gray-400 mb-7 md:px-10">
                    Others
                </Label>
                <LogoutConfirmationDialog
                    className="w-full p-0  md:px-10 flex justify-center md:justify-start"
                    labelClass="hidden md:flex "
                />
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
        <li>
            <Link
                to={to}
                className={`w-full flex items-center gap-3 py-3 md:p-3 justify-center md:justify-start md:pl-5 transition-all ${
                    isActive
                        ? "text-primary font-semibold bg-gray-100"
                        : "text-black hover:text-primary"
                }`}
            >
                {/* Icon */}
                <div className="text-lg">{icon}</div>
                {/* Label: Only visible in desktop */}
                <span className="hidden md:inline">{text}</span>
            </Link>
        </li>
    );
};

export default Sidebar;
