//-----------------------------------------------------------------------------------------//
// src/components/customer/TransactionsDashboard.jsx
import React, { useState, useEffect } from "react";
import { customerAPI } from "../../services/api";
import { formatCurrency, formatDate } from "../../utils/auth";
import { SuccessMessage } from "../common/SuccessMessage";
import DepositModal from "./DepositModal";
import { WithdrawModal } from "./WithdrawModal";
import { ErrorMessage } from "../common/ErrorMessage";

const TransactionsDashboard = () => {
  const [data, setData] = useState({ balance: 0, transactions: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);

  const fetchData = async () => {
    try {
      const response = await customerAPI.getTransactions();
      setData(response.data);
      setError("");
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleTransactionSuccess = (message) => {
    setSuccess(message);
    fetchData(); // Refresh data
    setTimeout(() => setSuccess(""), 3000); // Clear success message
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen w-full min-w-full">
      <div className="w-full min-w-full px-6 sm:px-8 lg:px-12 py-8">
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Dashboard</h1>
          <p className="text-lg text-gray-600">
            Manage your account and view transaction history
          </p>
        </div>

        {/* Message Components */}
        <div className="mb-6">
          <ErrorMessage message={error} onClose={() => setError("")} />
          <SuccessMessage message={success} onClose={() => setSuccess("")} />
        </div>

        {/* Balance Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-10 hover:shadow-xl transition-shadow duration-300">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-6 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl font-bold">$</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Current Balance
                </p>
                <p className="text-5xl font-bold text-gray-900">
                  {formatCurrency(data.balance)}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowDepositModal(true)}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span className="text-lg">+</span>
                <span>Deposit</span>
              </button>
              <button
                onClick={() => setShowWithdrawModal(true)}
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span className="text-lg">-</span>
                <span>Withdraw</span>
              </button>
            </div>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-100 bg-gray-50">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                Recent Transactions
              </h2>
              <div className="text-sm text-gray-500">
                {data.transactions.length} transaction
                {data.transactions.length !== 1 ? "s" : ""}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Balance After
                  </th>
                  <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-50">
                {data.transactions.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-8 py-12 text-center">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-gray-400 text-2xl">📊</span>
                        </div>
                        <div>
                          <p className="text-lg font-medium text-gray-500">
                            No transactions yet
                          </p>
                          <p className="text-sm text-gray-400">
                            Your transaction history will appear here
                          </p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  data.transactions.map((transaction, index) => (
                    <tr
                      key={transaction.id}
                      className={`hover:bg-gray-50 transition-colors duration-150 ${
                        index % 2 === 0 ? "bg-white" : "bg-gray-25"
                      }`}
                    >
                      <td className="px-8 py-6 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full ${
                            transaction.type === "deposit"
                              ? "bg-green-100 text-green-800 border border-green-200"
                              : "bg-red-100 text-red-800 border border-red-200"
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full mr-2 ${
                              transaction.type === "deposit"
                                ? "bg-green-500"
                                : "bg-red-500"
                            }`}
                          ></span>
                          {transaction.type.charAt(0).toUpperCase() +
                            transaction.type.slice(1)}
                        </span>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <span
                          className={`text-lg font-bold ${
                            transaction.type === "deposit"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {transaction.type === "deposit" ? "+" : "-"}
                          {formatCurrency(transaction.amount)}
                        </span>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <span className="text-gray-900 font-medium">
                          {transaction.description}
                        </span>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <span className="text-gray-900 font-semibold">
                          {formatCurrency(transaction.balance_after)}
                        </span>
                      </td>
                      <td className="px-8 py-6 whitespace-nowrap">
                        <span className="text-gray-500 text-sm">
                          {formatDate(transaction.created_at)}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modals */}
        {showDepositModal && (
          <DepositModal
            onClose={() => setShowDepositModal(false)}
            onSuccess={handleTransactionSuccess}
            currentBalance={data.balance}
          />
        )}
        {showWithdrawModal && (
          <WithdrawModal
            onClose={() => setShowWithdrawModal(false)}
            onSuccess={handleTransactionSuccess}
            currentBalance={data.balance}
          />
        )}
      </div>
    </div>
  );
};

export default TransactionsDashboard;
