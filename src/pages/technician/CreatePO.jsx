import { useParams } from "react-router-dom";
import { useState } from "react";
const API_BASE = import.meta.env.VITE_API_BASE_URL;
export default function CreatePO() {
  const { requestId } = useParams();

  const [woId, setWoId] = useState("");
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const createPO = async () => {
    if (!woId || !item) {
      alert("Work order ID and item name are required");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/purchase-orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requestId,
          woId,
          item_name: item,
          quantity,
          price,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create PO");
      }

      alert("Purchase Order created successfully ✅");

    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md">
      <h2 className="text-xl font-bold mb-4">
        Create Purchase Order
      </h2>

      <p className="mb-4"><b>Request ID:</b> {requestId}</p>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Work Order ID (REPLACE one)"
        value={woId}
        onChange={(e) => setWoId(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-3"
        placeholder="Item name"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-3"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-4"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <button
        onClick={createPO}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {loading ? "Creating..." : "Create Purchase Order"}
      </button>
    </div>
  );
}
