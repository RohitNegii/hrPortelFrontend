import API from "../utils/api";

export const createCandidate = (data) =>
  API.post("/candidates", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const getCandidates = (query = {}) =>
  API.get("/candidates", { params: query });
export const downloadResume = (url) =>
  window.open(url);
export const selectCandidate = (id) => API.patch(`/candidates/select/${id}`);
