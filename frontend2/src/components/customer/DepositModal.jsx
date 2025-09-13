// // src/components/customer/DepositModal.jsx
// import React, { useState } from "react";
// import { customerAPI } from "../../services/api";
// import { formatCurrency, isValidAmount } from "../../utils/auth";
// import { ErrorMessage } from "../common/ErrorMessage";

// const DepositModal = ({ onClose, onSuccess, currentBalance }) => {
//   const [amount, setAmount] = useState("");
//   const [description, setDescription] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!isValidAmount(amount)) {
//       setError("Please enter a valid amount greater than 0");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       await customerAPI.deposit(amount, description);
//       onSuccess(`Successfully deposited ${formatCurrency(parseFloat(amount))}`);
//       onClose();
//     } catch (err) {
//       setError(err.response?.data?.error || "Deposit failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-white/20 backdrop-blur-sm flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-semibold text-gray-900">Make Deposit</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 text-2xl"
//           >
//             ×
//           </button>
//         </div>

//         <div className="mb-4 p-3 bg-gray-50 rounded-lg">
//           <p className="text-sm text-gray-600">Current Balance:</p>
//           <p className="text-lg font-semibold text-green-600">
//             {formatCurrency(currentBalance)}
//           </p>
//         </div>

//         <ErrorMessage message={error} onClose={() => setError("")} />

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Amount ($)
//             </label>
//             <input
//               type="number"
//               step="0.01"
//               min="0.01"
//               required
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
//               placeholder="0.00"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Description (Optional)
//             </label>
//             <input
//               type="text"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
//               placeholder="e.g., Salary deposit"
//             />
//           </div>

//           <div className="flex space-x-3 pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="flex-1 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
//             >
//               {loading ? "Processing..." : "Deposit"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
// export default DepositModal;
//------------------------------------------------------------------------------------------//
// src/components/customer/DepositModal.jsx
import React, { useState, useEffect } from "react";
import { customerAPI } from "../../services/api";
import { formatCurrency, isValidAmount } from "../../utils/auth";
import { ErrorMessage } from "../common/ErrorMessage";

const DepositModal = ({ onClose, onSuccess, currentBalance }) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Block scroll when modal is open
  useEffect(() => {
    // Store original styles
    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    // Block scroll on both body and html
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Also prevent touch scrolling on mobile
    const preventScroll = (e) => {
      e.preventDefault();
    };

    document.addEventListener("touchmove", preventScroll, { passive: false });

    // Cleanup function
    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
      document.removeEventListener("touchmove", preventScroll);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidAmount(amount)) {
      setError("Please enter a valid amount greater than 0");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await customerAPI.deposit(amount, description);
      onSuccess(`Successfully deposited ${formatCurrency(parseFloat(amount))}`);
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || "Deposit failed");
    } finally {
      setLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-200 scale-100">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl font-bold">+</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Make Deposit</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
          >
            <span className="text-gray-500 text-xl">×</span>
          </button>
        </div>

        <div className="p-6">
          {/* Balance Display */}
          <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
            <p className="text-sm font-medium text-green-700 mb-1">
              Current Balance:
            </p>
            <p className="text-2xl font-bold text-green-800">
              {formatCurrency(currentBalance)}
            </p>
          </div>

          <ErrorMessage message={error} onClose={() => setError("")} />

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Deposit Amount ($)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">
                  $
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white text-lg font-medium"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description (Optional)
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-900 bg-white"
                placeholder="e.g., Salary deposit, Cash deposit"
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3 border border-gray-300 rounded-xl shadow-sm text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  "Deposit Funds"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DepositModal;
