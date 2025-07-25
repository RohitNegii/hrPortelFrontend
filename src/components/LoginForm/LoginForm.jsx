import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import API from "../../utils/api";
import { validateEmail, validatePassword } from "../../utils/validate";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";


const LoginForm = () => {
  const navigate=useNavigate()
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const login = useAuthStore((state) => state.login);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(form.email)) return toast.error("Invalid email format");
    if (!validatePassword(form.password))
      return toast.error("Password must be at least 6 characters");

    try {
      const res = await API.post("/auth/login", form);
      const token = res.data.token;
      const decoded = JSON.parse(atob(token.split(".")[1]));
      const expiresIn = decoded.exp - decoded.iat;

      login(token, expiresIn);
      toast.success("Login successful!");
      navigate("/dashboard")
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <>
      <h2 className={styles.title}>Welcome to Dashboard</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
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
        <div className={styles.inputWithIcon}>
          <input
            type={showPass ? "text" : "password"}
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className={styles.inputFull}
          />
          <span
            onClick={() => setShowPass((prev) => !prev)}
            className={styles.eye}
          >
            {showPass ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        </div>

        <div className={styles.forgotPass}>Forgot password?</div>

        <button type="submit" className={styles.btn}>
          Login
        </button>

        <p className={styles.bottomText}>
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </>
  );
};

export default LoginForm;
