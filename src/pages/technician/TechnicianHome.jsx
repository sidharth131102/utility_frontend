import { Link } from "react-router-dom";

export default function TechnicianHome() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Technician Dashboard</h1>

      <div className="space-y-3">
        <Link to="/tech/incoming" className="block btn">Incoming Requests</Link>
        <Link to="/tech/completed" className="block btn">Completed Requests</Link>
        <Link to="/tech/orders" className="block btn">Purchase Orders</Link>
      </div>
    </div>
  );
}
