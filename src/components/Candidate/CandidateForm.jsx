import React, { useState } from "react";
import styles from "./CandiateForm.module.css"

import { toast } from "react-toastify";
import { createCandidate } from "../../services/candidateApi";

const CandidateForm = ({ onClose, refersh }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    resume: null,
    accepted: false,
  });

  const validate = () => {
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.position ||
      !form.experience ||
      !form.resume
    ) {
      toast.error("All fields are required.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (!form.accepted) {
      toast.error("You must accept the declaration.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (key !== "accepted") data.append(key, value);
      });

      await createCandidate(data);
      toast.success("Candidate created successfully!");
      refersh()
      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Add New Candidate</h2>
          <button className={styles.close} onClick={onClose}>
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.row}>
            <input
              placeholder="Full Name*"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              placeholder="Email Address*"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className={styles.row}>
            <input
              placeholder="Phone Number*"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
           

            <select
              className={styles.dropdown}
              value={form.position}
              onChange={(e) => setForm({ ...form, position: e.target.value })}
            >
              <option value="">All Positions</option>
              <option value="Intern">Intern</option>
              <option value="Full Time">Full Time</option>
              <option value="Junior">Junior</option>
              <option value="Senior">Senior</option>
              <option value="Team Lead">Team Lead</option>
            </select>
          </div>
          <div className={styles.row}>
            <input
              placeholder="Experience*"
              value={form.experience}
              onChange={(e) => setForm({ ...form, experience: e.target.value })}
              required
            />
            <div className={styles.fileUpload}>
              <label className={styles.fileLabel}>
                Resume*
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) =>
                    setForm({ ...form, resume: e.target.files[0] })
                  }
                  required
                />
              </label>
            </div>
          </div>

          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={form.accepted}
              onChange={(e) => setForm({ ...form, accepted: e.target.checked })}
            />
            I hereby declare that the above information is true to the best of
            my knowledge and belief
          </label>

          <button
            type="submit"
            className={styles.saveBtn}
            disabled={!form.accepted}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default CandidateForm;
