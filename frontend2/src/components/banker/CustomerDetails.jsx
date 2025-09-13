// src/components/banker/CustomerDetails.jsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { bankerAPI } from "../../services/api";
import { formatCurrency, formatDate } from "../../utils/auth";
import { ErrorMessage } from "../common/ErrorMessage";

export const CustomerDetails = () => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({
    customer: null,
    transactions: [],
    total_transactions: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await bankerAPI.getCustomerTransactions(customerId);
        setData(response.data);
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Failed to fetch customer details");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerDetails();
  }, [customerId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!data.customer) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Customer Not Found
          </h2>
          <button
            onClick={() => navigate("/banker/accounts")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Back to Accounts
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/banker/accounts")}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          ← Back to Accounts
        </button>
      </div>

      <ErrorMessage message={error} onClose={() => setError("")} />

      {/* Customer Info Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-gray-600">Customer Name</p>
            <p className="text-xl font-semibold text-gray-900">
              {data.customer.name}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="text-lg text-gray-900">{data.customer.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Current Balance</p>
            <p
              className={`text-2xl font-bold ${
                data.customer.balance >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {formatCurrency(data.customer.balance)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Member Since</p>
            <p className="text-lg text-gray-900">
              {formatDate(data.customer.created_at)}
            </p>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Transaction History
          </h2>
          <span className="text-sm text-gray-600">
            Total Transactions: {data.total_transactions}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Balance After
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.transactions.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No transactions found for this customer
                  </td>
                </tr>
              ) : (
                data.transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          transaction.type === "deposit"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <span
                        className={
                          transaction.type === "deposit"
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {transaction.type === "deposit" ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(transaction.balance_after)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(transaction.created_at)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
