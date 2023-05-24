import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import CategoriesContainer from "./CategoriesContainer";
import LandingPage from "./LandingPage";
import Login from "./Login";
import Signup from "./Signup";

const RouteSwitch = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />}/>
                <Route path="/categories" element={<CategoriesContainer />} />
                <Route path="/categories/:category" element={<App />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouteSwitch;