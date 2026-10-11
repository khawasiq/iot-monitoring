import { BrowserRouter, Routes, Route } from "react-router";
import Dashboard from "../dashboards/Dashboard";
import Home from "../dashboards/Home";
export default function AppRoute(){
    return (
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home />} />
        </Routes>
        </BrowserRouter>

    );
}