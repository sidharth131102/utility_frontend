import { useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
const API_BASE = import.meta.env.VITE_API_BASE_URL;
export default function UploadPage() {
  const { woId } = useParams();
  const [searchParams] = useSearchParams();

  const requestId = searchParams.get("requestId");
  const role = searchParams.get("role");

  const [file, setFile] = useState(null);
  const [remark, setRemark] = useState("");
  const [loading, setLoading] = useState(false);

  const submitInspection = async () => {
    if (!file || !remark) {
      alert("Please select file and remark");
      return;
    }

    if (!requestId || !role) {
      alert("Missing request details");
      return;
    }

    setLoading(true);

    try {
      // 1. Mark work order IN-PROGRESS
      await fetch(
        `${API_BASE}/api/work-orders/${woId}/inspect`,
        { method: "POST" }
      );

      // 2. Get signed upload URL
      const urlRes = await fetch(
        `http://localhost:8080/api/upload-url` +
        `?requestId=${requestId}` +
        `&role=${role}` +
        `&remark=${remark.toLowerCase()}` +
        `&woId=${woId}`
      );

      if (!urlRes.ok) throw new Error("Signed URL fetch failed");

      const { signed_url } = await urlRes.json();

      // 3. Upload file to GCS
      const uploadRes = await fetch(signed_url, {
        method: "PUT",
        body: file,
      });

      if (!uploadRes.ok) throw new Error("File upload failed");

      // 4. Submit final remark
      const submitRes = await fetch(
        `http://localhost:8080/api/work-orders/${woId}/submit`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ remark }),
        }
      );

      if (!submitRes.ok) throw new Error("Submit failed");

      alert("Inspection submitted successfully ✅");

    } catch (err) {
      console.error(err);
      alert("Failed to submit inspection ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md">
      <h2 className="text-xl font-bold mb-4">
        Inspect Work Order
      </h2>

      <p className="mb-2"><b>Work Order ID:</b> {woId}</p>
      <p className="mb-4"><b>Request ID:</b> {requestId}</p>

      <input
        type="file"
        className="block mb-4"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <select
        className="border p-2 w-full mb-4"
        value={remark}
        onChange={(e) => setRemark(e.target.value)}
      >
        <option value="">Select Remark</option>
        <option value="GOOD">GOOD</option>
        <option value="REPLACE">REPLACE</option>
      </select>

      <button
        onClick={submitInspection}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
      >
        {loading ? "Submitting..." : "Submit Inspection"}
      </button>
    </div>
  );
}
