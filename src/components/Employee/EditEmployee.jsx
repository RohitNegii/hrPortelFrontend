import React, { useState, useEffect } from "react";
import styles from "./EditEmployee.module.css";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";


const positionOptions = [
  "Intern",
  "Full Time",
  "Junior",
  "Senior",
  "Team Lead",
];

const EditEmployeeModal = ({ employee, onClose, onSave }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    dateOfJoining: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || "",
        email: employee.email || "",
        phone: employee.phone || "",
        department: employee.department || "",
        position: employee.position || "",
        dateOfJoining: employee.dateOfJoining
          ? employee.dateOfJoining.substring(0, 10)
          : "",
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!formData.department.trim())
      newErrors.department = "Department is required.";
    if (!formData.position.trim()) newErrors.position = "Position is required.";
    if (!formData.dateOfJoining.trim())
      newErrors.dateOfJoining = "Date of joining is required.";

    setErrors(newErrors);

    // Show first error toast
    if (Object.keys(newErrors).length > 0) {
      const firstErrorKey = Object.keys(newErrors)[0];
      toast.error(newErrors[firstErrorKey]);
      return false;
    }

    return true;
  };

 const handleSubmit = async () => {
   if (validate()) {
     setLoading(true);
     try {
       await onSave(formData); 
     } catch (error) {
       toast.error("Failed to save employee.");
     } finally {
       setLoading(false);
     }
   }
 };


  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h3>Edit Employee Details</h3>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.form}>
          <div className={styles.formGroup}>
            <label>Full Name*</label>
            <input name="name" value={formData.name} onChange={handleChange} />
          </div>

          <div className={styles.formGroup}>
            <label>Email Address*</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Phone Number*</label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Department*</label>
            <input
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
          </div>

          <div className={styles.formGroup}>
            <label>Position*</label>
            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
            >
              <option value="">Select</option>
              {positionOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Date of Joining*</label>
            <input
              name="dateOfJoining"
              type="date"
              value={formData.dateOfJoining}
              onChange={handleChange}
            />
          </div>
        </div>

        <button
          className={styles.saveButton}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <ClipLoader size={20} color="#fff" /> : "Save"}
        </button>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
