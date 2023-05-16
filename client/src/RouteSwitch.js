import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Categories from "./Categories";

const RouteSwitch = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/categories" element={<Categories />} />
                <Route path="/categories/:category" element={<App />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouteSwitch;