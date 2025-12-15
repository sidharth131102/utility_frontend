import { useState } from "react";
const API_BASE = import.meta.env.VITE_API_BASE_URL;
export default function CustomerStatus() {
  const [requestId, setRequestId] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchStatus = async () => {
    if (!requestId) {
      alert("Please enter Request ID");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch(
        `${API_BASE}/api/customer/request-status?requestId=${requestId}`
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Failed to fetch status");
      }

      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Track Your Request</h1>

      {/* Input */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter Request ID (SN-xxxx)"
          className="border p-2 flex-1 rounded"
          value={requestId}
          onChange={(e) => setRequestId(e.target.value)}
        />
        <button
          onClick={fetchStatus}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
        >
          Check Status
        </button>
      </div>

      {loading && <p>Loading status...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {data && (
        <div className="space-y-6">
          {/* Request Info */}
          <div className="border p-4 rounded bg-white shadow">
            <h2 className="font-bold text-lg mb-2">
              Request ID: {data.request.requestId}
            </h2>
            <p><b>Status:</b> {data.request.status}</p>
            <p><b>Location:</b> {data.request.location}</p>
          </div>

          {/* Work Orders */}
          <div className="border p-4 rounded bg-white shadow">
            <h3 className="font-bold mb-3">Inspection Status</h3>
            {data.work_orders.map((wo) => (
              <div key={wo.woId} className="mb-2">
                <p>
                  <b>{wo.technician_role_name}:</b>{" "}
                  {wo.status}
                </p>
              </div>
            ))}
          </div>

          {/* Purchase Orders */}
          {data.purchase_orders.length > 0 && (
            <div className="border p-4 rounded bg-white shadow">
              <h3 className="font-bold mb-3">Purchase Orders</h3>
              {data.purchase_orders.map((po) => (
                <div key={po.poId} className="mb-2">
                  <p>
                    <b>PO ID:</b> {po.poId} — {po.item_name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
    