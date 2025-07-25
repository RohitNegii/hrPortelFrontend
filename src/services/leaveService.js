import API from "../utils/api";

export const getPresentEmployees = async () => {
  const res = await API.get("/leaves/employee?status=present");
  return res.data;
};

export const submitLeave = async (formData) => {
  const res = await API.post("/leaves", formData);
  return res.data;
};

export const getLeaves = async (search = "", status = "") => {
  const res = await API.get(`/leaves?search=${search}&status=${status}`);
  return res.data;
};

export const updateLeaveStatus = async (id, status) => {
  const res = await API.patch(`/leaves/${id}`, { status });
  return res.data;
};

export const getApprovedLeaves = async () => {
  const res = await API.get("/leaves/approved");
  return res.data;
};

