import React, { useState } from "react";
import styles from "./RegisterForm.module.css";
import { toast } from "react-toastify";
import API from "../../utils/api";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import {
  validateEmail,
  validatePassword,
  validateName,
} from "../../utils/validate";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateName(form.name)) return toast.error("Full name is required");
    if (!validateEmail(form.email)) return toast.error("Invalid email format");
    if (!validatePassword(form.password))
      return toast.error("Password must be at least 6 characters");
    if (form.password !== form.confirmPassword)
      return toast.error("Passwords do not match");

    try {
      const res = await API.post("/auth/register", form);
      toast.success(res.data.message || "Registration successful");
      setTimeout(() => (window.location.href = "/"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <>
      <h2 className={styles.title}>Welcome to Dashboard</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Full name<span className={styles.required}>*</span>
        </label>
        <input
          type="text"
          name="name"
          placeholder="Full name"
          onChange={handleChange}
        />

        <label>
          Email Address<span className={styles.required}>*</span>
        </label>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
        />

        <label>
          Password<span className={styles.required}>*</span>
        </label>
        <div className={styles.inputWrapper}>
          <input
            type={showPass ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className={styles.inputFull}
          />
          <span
            onClick={() => setShowPass((prev) => !prev)}
            className={styles.eyeIcon}
          >
            {showPass ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        </div>

        <label>
          Confirm Password<span className={styles.required}>*</span>
        </label>
        <div className={styles.inputWrapper}>
          <input
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            className={styles.inputFull}
          />
          <span
            onClick={() => setShowConfirm((prev) => !prev)}
            className={styles.eyeIcon}
          >
            {showConfirm ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        </div>

        <button type="submit" className={styles.btn}>
          Register
        </button>
        <p className={styles.bottomText}>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </form>
    </>
  );
};

export default RegisterForm;
