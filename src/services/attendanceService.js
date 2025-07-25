import API from "../utils/api";

export const fetchAttendance = async (search = "", status = "") => {
  const res = await API.get("/attendance", {
    params: { search, status },
  });
  return res.data;
};

export const updateAttendance = async (employeeId, status) => {
  const res = await API.put(`/attendance/${employeeId}`, { status });
  return res.data;
};
