import React, { useState } from "react";
import styles from "./AuthForm.module.css";
import API from "../../utils/api";
import { validateEmail, validatePassword } from "../../utils/validate";
import { useAuthStore } from "../../store/authStore";

const AuthForm = ({ type }) => {
  const isLogin = type === "Login";
  const loginWithToken = useAuthStore((state) => state.login);

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(form.email)) return setError("Invalid email");
    if (!validatePassword(form.password))
      return setError("Min 6 characters password");

    if (!isLogin && !form.name.trim()) return setError("Name is required");

    try {
      const res = await API.post(
        `/auth/${isLogin ? "login" : "register"}`,
        form
      );

      if (isLogin) {
        const token = res.data.token;
        const decoded = JSON.parse(atob(token.split(".")[1]));
        const expiresIn = decoded.exp - decoded.iat;

        loginWithToken(token, expiresIn);
      } else {
        alert(res.data.message);
        window.location.href = "/";
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>{type}</h2>
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit">{type}</button>
      </form>
    </div>
  );
};

export default AuthForm;
