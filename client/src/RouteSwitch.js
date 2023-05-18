import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import CategoriesContainer from "./CategoriesContainer";

const RouteSwitch = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<div>Home Page</div>}/>
                <Route path="/categories" element={<CategoriesContainer />} />
                <Route path="/categories/:category" element={<App />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouteSwitch;