import api from "./axios";

export const createRequest = (payload) => {
  return api.post("/api/requests", payload);
};
