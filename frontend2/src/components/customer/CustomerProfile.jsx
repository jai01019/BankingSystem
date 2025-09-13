// src/components/customer/CustomerProfile.jsx
import React, { useState, useEffect } from "react";
import { customerAPI } from "../../services/api";
import { formatDate } from "../../utils/auth";
import { ErrorMessage } from "../common/ErrorMessage";
import { toast } from "react-toastify";

const CustomerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await customerAPI.getProfile();
        setProfile(response.data.account);
      } catch (error) {
        setError("Failed to fetch profile data");

        // Try to get a human-readable message
        const message =
          error?.response?.data?.message ||
          error.message ||
          "Something went wrong";

        toast.error(message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600">View your account information</p>
      </div>

      <ErrorMessage message={error} onClose={() => setError("")} />

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Full Name
            </label>
            <p className="text-lg text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
              {profile.name}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Email Address
            </label>
            <p className="text-lg text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
              {profile.email}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Account Type
            </label>
            <p className="text-lg text-gray-900 bg-gray-50 px-3 py-2 rounded-md capitalize">
              {profile.role}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Current Balance
            </label>
            <p className="text-lg font-semibold text-green-600 bg-gray-50 px-3 py-2 rounded-md">
              ${profile.balance?.toFixed(2) || "0.00"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Account ID
            </label>
            <p className="text-lg text-gray-900 bg-gray-50 px-3 py-2 rounded-md font-mono">
              {profile.id}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Member Since
            </label>
            <p className="text-lg text-gray-900 bg-gray-50 px-3 py-2 rounded-md">
              {formatDate(profile.created_at)}
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Account Security
          </h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-green-400 rounded-full mr-3"></span>
              <span className="text-gray-700">
                Account is active and secure
              </span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-green-400 rounded-full mr-3"></span>
              <span className="text-gray-700">
                Two-factor authentication recommended
              </span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></span>
              <span className="text-gray-700">Last login: Recent activity</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CustomerProfile;
