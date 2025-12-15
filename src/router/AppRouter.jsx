import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import CustomerHome from "../pages/customer/CustomerHome";
import CreatePO from "../pages/technician/CreatePO";
import TechnicianHome from "../pages/technician/TechnicianHome";
import IncomingRequests from "../pages/technician/IncomingRequests";
import UploadPage from "../pages/technician/UploadPage";
import CompletedRequests from "../pages/technician/CompletedRequests";
import OrdersPage from "../pages/technician/OrdersPage";
import CustomerStatus from "../pages/customer/CustomerStatus";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing */}
        <Route path="/" element={<Landing />} />

        {/* Customer */}
        <Route path="/customer" element={<CustomerHome />} />

        {/* Technician */}
        <Route path="/tech" element={<TechnicianHome />} />
        <Route path="/tech/incoming" element={<IncomingRequests />} />
        <Route path="/tech/upload/:woId" element={<UploadPage />} />
        <Route path="/tech/completed" element={<CompletedRequests />} />
        <Route path="/tech/orders" element={<OrdersPage />} />
        <Route path="/tech/create-po/:requestId" element={<CreatePO />} />
        <Route path="/customer/status" element={<CustomerStatus />} />

      </Routes>
    </BrowserRouter>
  );
}
