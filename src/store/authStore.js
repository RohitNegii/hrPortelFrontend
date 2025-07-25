import { create } from "zustand";

const TOKEN_KEY = "token";
const EXPIRY_KEY = "tokenExpiry";

export const useAuthStore = create((set, get) => ({
  token: localStorage.getItem(TOKEN_KEY),
  login: (token, expiresInSec) => {
    const expiry = new Date(new Date().getTime() + expiresInSec * 1000);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(EXPIRY_KEY, expiry);
    set({ token });

    setTimeout(() => {
      get().logout();
    }, expiresInSec * 1000);
  },
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EXPIRY_KEY);
    set({ token: null });
    window.location.href = "/";
  },
}));
