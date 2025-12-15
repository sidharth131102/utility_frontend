import api from "./axios";

export const createPurchaseOrder = (payload) => {
  return api.post("/api/purchase-orders", payload);
};
