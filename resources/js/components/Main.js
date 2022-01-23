import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { Routes, Route, Navigate, HashRouter } from "react-router-dom";
import Client from "./client";
import ClientCreate from "./client/create";
export default function MainLayout() {
    return (
        <HashRouter>
            <div className="grid">
                <div className="topmenu"></div>

                <div className="main-content">
                    <Routes>
                        <Route
                            path="/"
                            element={<Navigate replace to="/client" />}
                        />
                        <Route path="/client" element={<Client />} />

                        <Route
                            path="/client/create"
                            element={<ClientCreate />}
                        />
                    </Routes>
                </div>
            </div>
        </HashRouter>
    );
}

if (document.getElementById("root")) {
    ReactDOM.render(<MainLayout />, document.getElementById("root"));
}
