// src/services/api.js
import axios from "axios";
import { getToken, removeToken } from "../utils/auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests automatically
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle responses and errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      removeToken();
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

// Authentication API calls
export const authAPI = {
  // Customer signup
  customerSignup: (userData) =>
    api.post("/api/auth/signup", { ...userData, role: "customer" }),

  // Customer login
  customerLogin: (credentials) =>
    api.post("/api/auth/login", { ...credentials, role: "customer" }),

  // Banker signup
  bankerSignup: (userData) =>
    api.post("/api/auth/signup", { ...userData, role: "banker" }),

  // Banker login
  bankerLogin: (credentials) =>
    api.post("/api/auth/login", { ...credentials, role: "banker" }),
};

// Customer API calls
export const customerAPI = {
  // Get balance and transactions
  getTransactions: () => api.get("/api/transactions"),

  // Make deposit
  deposit: (amount, description) =>
    api.post("/api/transactions", {
      type: "deposit",
      amount: parseFloat(amount),
      description: description || "Deposit",
    }),

  // Make withdrawal
  withdraw: (amount, description) =>
    api.post("/api/transactions", {
      type: "withdrawal",
      amount: parseFloat(amount),
      description: description || "Withdrawal",
    }),

  // Get customer profile
  getProfile: () => api.get("/api/accounts/profile"),
};

// Banker API calls
export const bankerAPI = {
  // Get all customers
  getCustomers: () => api.get("/api/banker/customers"),

  // Get customer transaction history
  getCustomerTransactions: (customerId) =>
    api.get(`/api/banker/customers/${customerId}/transactions`),

  // Get banking overview
  getOverview: () => api.get("/api/banker/overview"),
};

export default api;
