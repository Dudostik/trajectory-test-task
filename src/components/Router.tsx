import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/home/Home";
import VehicleDetail from "./screens/vehicle-detail/VehicleDetail";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<VehicleDetail />} path="/vehicle/:id" />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
