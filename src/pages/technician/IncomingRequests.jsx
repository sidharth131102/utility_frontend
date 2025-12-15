import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function IncomingRequests() {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // --------------------------------------------
  // Fetch Incoming Requests + Work Orders
  // --------------------------------------------
  useEffect(() => {
    fetch("http://localhost:8080/api/requests/incoming-with-workorders")
      .then((res) => res.json())
      .then((data) => {
        setRequests(data.incoming_requests || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch incoming requests", err);
        setLoading(false);
      });
  }, []);

  // --------------------------------------------
  // Filter by Request ID (Search)
  // --------------------------------------------
  const filteredRequests = requests.filter((req) =>
    req.requestId?.toLowerCase().includes(search.toLowerCase())
  );

  // --------------------------------------------
  // Loading State
  // --------------------------------------------
  if (loading) {
    return <p className="p-6">Loading incoming work orders...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Incoming Work Orders</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by Request ID"
        className="border p-2 mb-6 w-full rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* No Results */}
      {filteredRequests.length === 0 && (
        <p className="text-gray-500">No requests found.</p>
      )}

      {/* Requests List */}
      <div className="space-y-6">
        {filteredRequests.map((req) => (
          <div
            key={req.requestId}
            className="border rounded-lg p-5 bg-white shadow"
          >
            {/* Request Header */}
            <h2 className="text-lg font-bold mb-4">
              Request ID: {req.requestId}
            </h2>
            {req.status === "INSPECTION_COMPLETED" && req.replacement_required && (
              <button
                onClick={() => navigate(`/tech/create-po/${req.requestId}`)}
                className="mb-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Create Purchase Order
              </button>
            )}

            {/* Work Orders under Request */}
            <div className="space-y-3">
              {req.work_orders?.map((wo) => (
                <div
                  key={wo.woId}
                  className="border rounded p-4 bg-gray-50"
                >
                  <p>
                    <b>Work Order ID:</b> {wo.woId}
                  </p>
                  <p>
                    <b>Role:</b> {wo.technician_role_name}
                  </p>
                  <p>
                    <b>Status:</b> {wo.status}
                  </p>

                  <button
                    onClick={() =>
                      navigate(`/tech/upload/${wo.woId}?requestId=${req.requestId}&role=${wo.technician_role}`)
                    }
                    className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Inspect
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
