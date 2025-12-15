import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function CustomerHome() {
  const [form, setForm] = useState({
    customer_name: "",
    phone_number: "",
    location: "",
    request_type: "",
    description: "",
  });

  const [response, setResponse] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitRequest = async () => {
    try {
      const res = await axios.post(`${API_BASE}/api/requests`, form);
      setResponse(res.data);
    } catch (err) {
      alert("Failed to create request");
    }
  };

  return (
    <div className="page">
      <h1 className="page-title">Customer Service Request</h1>

      <div className="card">
        <input
          className="input"
          name="customer_name"
          placeholder="Customer Name"
          onChange={handleChange}
        />

        <input
          className="input"
          name="phone_number"
          placeholder="Phone Number"
          onChange={handleChange}
        />

        <input
          className="input"
          name="location"
          placeholder="Location"
          onChange={handleChange}
        />

        <input
          className="input"
          name="request_type"
          placeholder="Request Type (Power / Transformer / Line)"
          onChange={handleChange}
        />

        <textarea
          className="input"
          name="description"
          placeholder="Describe the issue"
          rows="3"
          onChange={handleChange}
        />

        <button className="btn w-full mt-2" onClick={submitRequest}>
          Submit Request
        </button>
      </div>

      {/* ✅ Always visible */}
      <div className="card mt-6">
        <button
          className="btn w-full"
          onClick={() =>
            navigate(
              response?.requestId
                ? `/customer/status?requestId=${response.requestId}`
                : `/customer/status`
            )
          }
        >
          Track Request Status
        </button>
      </div>

      {/* Optional: success info */}
      {response && (
        <div className="card mt-6">
          <h2 className="section-title">Request Created ✅</h2>

          <p>
            <b>Request ID:</b> {response.requestId}
          </p>
          <p>
            <b>Status:</b> {response.status}
          </p>
        </div>
      )}
    </div>
  );
}
