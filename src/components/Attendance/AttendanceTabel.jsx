import React, { useEffect, useState } from "react";
import {
  fetchAttendance,
  updateAttendance,
} from "../../services/attendanceService";
import CustomTable from "../global/Table";
import styles from "./Attendance.module.css";
import { toast } from "react-toastify";

const AttendanceTable = () => {
  const [attendance, setAttendance] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const loadAttendance = async () => {
    try {
      const data = await fetchAttendance(search, statusFilter);
      const withActions = data.map((emp) => ({
        ...emp,
        status: emp.status,
        actions: {
          markPresent: {
            label: "Mark Present",
            onClick: () => handleUpdate(emp._id, "Present"),
          },
          markAbsent: {
            label: "Mark Absent",
            onClick: () => handleUpdate(emp._id, "Absent"),
          },
          medical: {
            label: "Medical Leave",
            onClick: () => handleUpdate(emp._id, "Medical Leave"),
          },
          wfh: {
            label: "Work From Home",
            onClick: () => handleUpdate(emp._id, "Work From Home"),
          },
        },
      }));
      setAttendance(withActions);
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to fetch attendance");
    }
  };

  useEffect(() => {
    loadAttendance();
  }, [search, statusFilter]);

  const handleUpdate = async (id, status) => {
    try {
      const response = await updateAttendance(id, status);
      toast.success(response.message || "Attendance updated");
      loadAttendance();
    } catch (error) {
      toast.error(
        error?.response?.data?.error || "Failed to update attendance"
      );
    }
  };

  const columns = [
    { title: "Employee Name", dataField: "name" },
    { title: "Position", dataField: "position" },
    { title: "Department", dataField: "department" },
    { title: "Task", dataField: "task" },
    { title: "Status", dataField: "status", type: "status" },
    { title: "Actions", dataField: "actions", type: "actions" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <select
          className={styles.dropdown}
          onChange={(e) => setStatusFilter(e.target.value)}
          value={statusFilter}
        >
          <option value="">Status</option>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
          <option value="Medical Leave">Medical Leave</option>
          <option value="Work From Home">Work From Home</option>
        </select>

        <input
          type="text"
          placeholder="Search..."
          className={styles.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <CustomTable columns={columns} data={attendance} />
    </div>
  );
};

export default AttendanceTable;
