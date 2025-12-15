import { useEffect, useState } from "react";
const API_BASE = import.meta.env.VITE_API_BASE_URL;
export default function OrdersPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // --------------------------------------------
  // Fetch ORDERED requests
  // --------------------------------------------
  useEffect(() => {
    fetch(`${API_BASE}/api/requests/ordered`)
      .then((res) => res.json())
      .then((data) => {
        setRequests(data.ordered_requests || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch ordered requests", err);
        setLoading(false);
      });
  }, []);

  // --------------------------------------------
  // Loading State
  // --------------------------------------------
  if (loading) {
    return <p className="p-6">Loading ordered requests...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Ordered Requests</h1>

      {/* No Results */}
      {requests.length === 0 && (
        <p className="text-gray-500">No ordered requests found.</p>
      )}

      {/* Ordered Requests */}
      <div className="space-y-6">
        {requests.map((req) => (
          <div
            key={req.requestId}
            className="border rounded-lg p-5 bg-white shadow"
          >
            {/* Request Header */}
            <h2 className="text-lg font-bold mb-2">
              Request ID: {req.requestId}
            </h2>

            <p className="mb-4">
              <b>Status:</b>{" "}
              <span className="text-blue-600 font-semibold">
                {req.status}
              </span>
            </p>

            {/* -------------------------------- */}
            {/* Work Orders */}
            {/* -------------------------------- */}
            <h3 className="font-semibold mb-2">Work Orders</h3>

            <div className="space-y-2 mb-4">
              {req.work_orders?.map((wo) => (
                <div
                  key={wo.woId}
                  className="border rounded p-3 bg-gray-50"
                >
                  <p><b>Work Order ID:</b> {wo.woId}</p>
                  <p><b>Role:</b> {wo.technician_role_name}</p>
                  <p><b>Status:</b> {wo.status}</p>
                  <p>
                    <b>PO Created:</b>{" "}
                    {wo.po_created ? "Yes" : "No"}
                  </p>
                </div>
              ))}
            </div>

            {/* -------------------------------- */}
            {/* Purchase Orders */}
            {/* -------------------------------- */}
            <h3 className="font-semibold mb-2">Purchase Orders</h3>

            {req.purchase_orders?.length === 0 ? (
              <p className="text-gray-500">No purchase orders created</p>
            ) : (
              <div className="space-y-2">
                {req.purchase_orders.map((po) => (
                  <div
                    key={po.poId}
                    className="border rounded p-3 bg-green-50"
                  >
                    <p><b>PO ID:</b> {po.poId}</p>
                    <p><b>Item:</b> {po.item_name}</p>
                    <p><b>Quantity:</b> {po.quantity}</p>
                    <p><b>Price:</b> {po.price}</p>
                    <p><b>Status:</b> {po.status}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
