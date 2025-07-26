import React, { useState, useEffect } from "react";
import styles from "./AddLeaves.module.css";
import { toast } from "react-toastify";
import {
  getPresentEmployees,
  submitLeave,
} from "../../services/leaveService.js";
import ClipLoader from "react-spinners/ClipLoader";

const AddLeaveModal = ({ open, onClose, onLeaveAdded }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    employeeId: "",
    designation: "",
    date: "",
    reason: "",
    doc: null,
  });

  useEffect(() => {
    if (open) fetchEmployees();
  }, [open]);

  const fetchEmployees = async () => {
    try {
      const res = await getPresentEmployees();
      setEmployees(res);
    } catch (err) {
      toast.error("Failed to load employees");
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const validateForm = () => {
    if (!formData.employeeId) {
      toast.error("Please select an employee");
      return false;
    }
    if (!formData.designation.trim()) {
      toast.error("Designation is required");
      return false;
    }
    if (!formData.date.trim()) {
      toast.error("Date is required");
      return false;
    }
    if (!formData.reason.trim()) {
      toast.error("Reason is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const payload = new FormData();
    for (const key in formData) {
      payload.append(key, formData[key]);
    }

    setLoading(true);
    try {
      await submitLeave(payload);
      toast.success("Leave applied successfully");
      onClose();
      onLeaveAdded();
    } catch (err) {
      toast.error("Error submitting leave");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Add New Leave</h2>
          <span
            className={styles.closeIcon}
            onClick={!loading ? onClose : null}
          >
            ×
          </span>
        </div>

        <div className={styles.form}>
          <select
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            disabled={loading}
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
            disabled={loading}
          />

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={styles.inputField}
            disabled={loading}
          />

          <input
            type="file"
            name="doc"
            onChange={handleChange}
            className={`${styles.inputField} ${styles.fileUpload}`}
            disabled={loading}
          />

          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Reason"
            rows={3}
            className={styles.inputField}
            disabled={loading}
          ></textarea>

          <button
            className={styles.submitButton}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? <ClipLoader size={20} color="#fff" /> : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLeaveModal;
