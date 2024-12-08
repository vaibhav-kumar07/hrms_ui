import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Candidates from "../components/candidate/Candidates";
import Leaves from "../components/leave/Leaves";
import Employees from "../components/employee/Employees";
import Attendences from "../components/attendance/Attendance";
import { useAuth } from "../context/AuthContext";

const AppRoutes: React.FC = () => {
    // let token = getCookieValue("token");
    const { token } = useAuth();
    return (
        <Routes>
            <Route
                path="/"
                element={token ? <Navigate to="/dashboard" /> : <Login />}
            />
            <Route
                path="/login"
                element={token ? <Navigate to="/dashboard" /> : <Login />}
            />
            <Route
                path="/register"
                element={token ? <Navigate to="/dashboard" /> : <Register />}
            />

            <Route
                path="/dashboard/*"
                element={token ? <Dashboard /> : <Navigate to="/login" />}
            >
                <Route index element={<Candidates />} />
                <Route path="candidates" element={<Candidates />} />
                <Route path="employees" element={<Employees />} />
                <Route path="attendance" element={<Attendences />} />
                <Route path="leaves" element={<Leaves />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
