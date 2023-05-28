import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import CategoriesContainer from "./CategoriesContainer";
import LandingPage from "./LandingPage";
import Login from "./Login";
import Signup from "./Signup";
import { useAuthContext } from "./hooks/useAuthContext";
import NotFound from "./NotFound";

const RouteSwitch = () => {
    const { user } = useAuthContext();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={!user ? <LandingPage /> : <Navigate to="/categories" /> }/>
                <Route path="/categories" element={user ? <CategoriesContainer /> : <Navigate to="/login" />} />
                <Route path="/categories/:category" element={user ? <App /> : <Navigate to="/login" />} />
                <Route path="/login" element={user ? <CategoriesContainer /> : <Login />} />
                <Route path="/signup" element={user ? <CategoriesContainer /> : <Signup />} />
                <Route path="*" element={<NotFound />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RouteSwitch;