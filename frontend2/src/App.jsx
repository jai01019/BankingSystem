/////////////////////////////////////////////////
// App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import { useAuth } from "./hooks/useAuth";
// Customer Components
import CustomerLogin from "./components/customer/CustomerLogin";
import { CustomerSignup } from "./components/customer/CustomerSignup";
import TransactionsDashboard from "./components/customer/TransactionsDashboard";
import CustomerProfile from "./components/customer/CustomerProfile";
// Banker Components
import BankerLogin from "./components/banker/BankerLogin";
import BankerSignup from "./components/banker/BankerSignup";
import { BankingOverview } from "./components/banker/BankingOverview";
import AccountsList from "./components/banker/AccountsList";
import { CustomerDetails } from "./components/banker/CustomerDetails";
// Common Components
import Header from "./components/common/Header";
import { Loading } from "./components/common/Loading";

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
  if (loading) return <Loading />;
  if (!user) return <Navigate to="/" replace />;
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Main App Content
function AppContent() {
  const { user, loading } = useAuth();
  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-100 w-full">
      {user && <Header />}
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            user ? (
              user.role === "customer" ? (
                <Navigate to="/customer/dashboard" replace />
              ) : (
                <Navigate to="/banker/overview" replace />
              )
            ) : (
              <CustomerLogin />
            )
          }
        />
        <Route path="/customer/signup" element={<CustomerSignup />} />
        <Route path="/banker/login" element={<BankerLogin />} />
        <Route path="/banker/signup" element={<BankerSignup />} />

        {/* Customer Protected Routes */}
        <Route
          path="/customer/dashboard"
          element={
            <ProtectedRoute requiredRole="customer">
              <TransactionsDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customer/profile"
          element={
            <ProtectedRoute requiredRole="customer">
              <CustomerProfile />
            </ProtectedRoute>
          }
        />

        {/* Banker Protected Routes */}
        <Route
          path="/banker/overview"
          element={
            <ProtectedRoute requiredRole="banker">
              <BankingOverview />
            </ProtectedRoute>
          }
        />
        <Route
          path="/banker/accounts"
          element={
            <ProtectedRoute requiredRole="banker">
              <AccountsList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/banker/customer/:customerId"
          element={
            <ProtectedRoute requiredRole="banker">
              <CustomerDetails />
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

// App component WITHOUT <Router>
function App() {
  return (
    <div className="w-full">
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </div>
  );
}

export default App;
