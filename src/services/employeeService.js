import API from "../utils/api";

export const getEmployees = async (search = "", status = "") => {
  const response = await API.get("/employees", {
    params: { search, status },
  });
  return response.data;
};

export const addEmployee = async (employeeData) => {
  const response = await API.post("/employees", employeeData);
  return response.data;
};

export const updateEmployee = async (id, updatedData) => {
  const response = await API.put(`/employees/${id}`, updatedData);
  return response.data;
};

export const deleteEmployee = async (id) => {
  const response = await API.delete(`/employees/${id}`);
  return response.data;
};
