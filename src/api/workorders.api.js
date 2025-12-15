import api from "./axios";

export const markInspect = (woId) => {
  return api.post(`/api/work-orders/${woId}/inspect`);
};

export const submitWorkOrder = (woId, remark) => {
  return api.post(`/api/work-orders/${woId}/submit`, {
    remark,
  });
};
