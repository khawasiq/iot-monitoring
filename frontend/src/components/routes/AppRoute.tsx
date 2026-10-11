import { BrowserRouter, Routes, Route } from "react-router";
import Signin from "../auth/Signin";
import Home from "../dashboards/Home";
import Signup from "../auth/Signup";
export default function AppRoute(){
    return (
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        </Routes>
        </BrowserRouter>

    );
}