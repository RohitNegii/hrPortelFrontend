import React, { useState, useEffect } from "react";
import styles from "./AddLeaves.module.css";
import { toast } from "react-toastify";
import {
  getPresentEmployees,
  submitLeave,
} from "../../services/leaveService.js";

const AddLeaveModal = ({ open, onClose, onLeaveAdded }) => {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
    employeeId: "",
    designation: "",
    date: "",
    reason: "",
    doc: null,
  });

  const fetchEmployees = async () => {
    try {
      const res = await getPresentEmployees();
      setEmployees(res);
    } catch (err) {
      toast.error("Failed to load employees");
    }
  };

  useEffect(() => {
    if (open) fetchEmployees();
  }, [open]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async () => {
    const payload = new FormData();
    for (const key in formData) {
      payload.append(key, formData[key]);
    }

    try {
      await submitLeave(payload);
      toast.success("Leave applied successfully");
      onClose();
      onLeaveAdded();
    } catch (err) {
      toast.error("Error submitting leave");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Add New Leave</h2>
          <span className={styles.closeIcon} onClick={onClose}>
            ×
          </span>
        </div>

        <div className={styles.form}>
          <select
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            required
          >
            <option value="">Search Employee Name</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            placeholder="Designation"
            className={styles.inputField}
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={styles.inputField}
          />

          <input
            type="file"
            name="doc"
            onChange={handleChange}
            className={`${styles.inputField} ${styles.fileUpload}`}
          />

          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Reason"
            rows={3}
            className={styles.inputField}
          ></textarea>

          <button
            className={styles.submitButton}
            onClick={handleSubmit}
            disabled={
              !formData.employeeId ||
              !formData.designation ||
              !formData.date ||
              !formData.reason
            }
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLeaveModal;
