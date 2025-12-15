import { useEffect, useState } from "react";

export default function CompletedRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/api/requests/completed")
      .then(res => res.json())
      .then(data => {
        setRequests(data.completed_requests || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="p-6">Loading completed requests...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Completed Requests</h1>

      {requests.length === 0 && (
        <p className="text-gray-500">No completed requests</p>
      )}

      <div className="space-y-6">
        {requests.map(req => (
          <div key={req.requestId} className="border rounded p-5 bg-white shadow">
            <h2 className="font-bold mb-2">
              Request ID: {req.requestId}
            </h2>

            <p><b>Customer:</b> {req.customer_name}</p>
            <p><b>Location:</b> {req.location}</p>

            <div className="mt-4 space-y-2">
              {req.work_orders.map(wo => (
                <div key={wo.woId} className="border p-3 rounded bg-gray-50">
                  <p><b>Role:</b> {wo.technician_role_name}</p>
                  <p><b>Status:</b> {wo.status}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
