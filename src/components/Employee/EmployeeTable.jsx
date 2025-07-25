import React, { useEffect, useState } from "react";
import CustomTable from "../global/Table";
import styles from "./EmployeeTable.module.css";

import {
  getEmployees,
  deleteEmployee,
  updateEmployee,
} from "../../services/employeeService";

import EditEmployeeModal from "./EditEmployee";
import { toast } from "react-toastify";

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [positionFilter, setPositionFilter] = useState("");
  const [editingEmployee, setEditingEmployee] = useState(null);

  const fetchData = async () => {
    try {
      const data = await getEmployees(search, positionFilter);
      const withActions = data.map((emp) => ({
        ...emp,
        actions: {
          edit: {
            label: "Edit",
            onClick: () => handleEdit(emp),
          },
          delete: {
            label: "Delete",
            onClick: () => handleDelete(emp._id),
          },
        },
      }));
      setEmployees(withActions);
    } catch (error) {
      console.error("Error fetching employees", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, positionFilter]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      const respons = await deleteEmployee(id);
      toast.success(respons.message);
      fetchData();
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployee(employee);
  };

  const handleSave = async (updatedData) => {
    const response = await updateEmployee(editingEmployee._id, updatedData);
    toast.success(response.message);
    setEditingEmployee(null);
    fetchData();
  };

  const columns = [
    { title: "Name", dataField: "name" },
    { title: "Email", dataField: "email" },
    { title: "Phone", dataField: "phone" },
    { title: "Position", dataField: "position" },
    { title: "Experience", dataField: "experience" },
    { title: "Status", dataField: "status", type: "status" },
    { title: "Actions", dataField: "actions", type: "actions" },
  ];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.filters}>
          <select
            className={styles.dropdown}
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
          >
            <option value="">All Positions</option>
            <option value="Intern">Intern</option>
            <option value="Full Time">Full Time</option>
            <option value="Junior">Junior</option>
            <option value="Senior">Senior</option>
            <option value="Team Lead">Team Lead</option>
          </select>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Search by name/email/position"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      <CustomTable columns={columns} data={employees} />
      </div>

      {editingEmployee && (
        <EditEmployeeModal
          employee={editingEmployee}
          onClose={() => setEditingEmployee(null)}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default EmployeeTable;
