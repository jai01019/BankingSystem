// // src/components/banker/BankingOverview.jsx
// import React, { useState, useEffect } from "react";
// import { bankerAPI } from "../../services/api";
// import { formatCurrency, formatDate } from "../../utils/auth";
// import { ErrorMessage } from "../common/ErrorMessage";

// export const BankingOverview = () => {
//   const [data, setData] = useState({
//     overview: {
//       total_customers: 0,
//       total_transactions: 0,
//       total_deposits: 0,
//       total_withdrawals: 0,
//       total_balance: 0,
//     },
//     recent_transactions: [],
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchOverview = async () => {
//       try {
//         const response = await bankerAPI.getOverview();
//         setData(response.data);
//         // eslint-disable-next-line no-unused-vars
//       } catch (err) {
//         setError("Failed to fetch overview data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOverview();
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-900 mb-2">
//           Banking Overview
//         </h1>
//         <p className="text-gray-600">
//           Monitor your bank's performance and activity
//         </p>
//       </div>

//       <ErrorMessage message={error} onClose={() => setError("")} />

//       {/* Statistics Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <div className="flex items-center">
//             <div className="p-2 bg-blue-100 rounded-lg">
//               <span className="text-blue-600 text-xl">👥</span>
//             </div>
//             <div className="ml-4">
//               <p className="text-sm text-gray-600">Total Customers</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 {data.overview.total_customers}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <div className="flex items-center">
//             <div className="p-2 bg-green-100 rounded-lg">
//               <span className="text-green-600 text-xl">💳</span>
//             </div>
//             <div className="ml-4">
//               <p className="text-sm text-gray-600">Total Transactions</p>
//               <p className="text-2xl font-bold text-gray-900">
//                 {data.overview.total_transactions}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <div className="flex items-center">
//             <div className="p-2 bg-green-100 rounded-lg">
//               <span className="text-green-600 text-xl">⬆️</span>
//             </div>
//             <div className="ml-4">
//               <p className="text-sm text-gray-600">Total Deposits</p>
//               <p className="text-2xl font-bold text-green-600">
//                 {formatCurrency(data.overview.total_deposits)}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <div className="flex items-center">
//             <div className="p-2 bg-red-100 rounded-lg">
//               <span className="text-red-600 text-xl">⬇️</span>
//             </div>
//             <div className="ml-4">
//               <p className="text-sm text-gray-600">Total Withdrawals</p>
//               <p className="text-2xl font-bold text-red-600">
//                 {formatCurrency(data.overview.total_withdrawals)}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <div className="flex items-center">
//             <div className="p-2 bg-blue-100 rounded-lg">
//               <span className="text-blue-600 text-xl">💰</span>
//             </div>
//             <div className="ml-4">
//               <p className="text-sm text-gray-600">Total Balance</p>
//               <p className="text-2xl font-bold text-blue-600">
//                 {formatCurrency(data.overview.total_balance)}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Recent Transactions */}
//       <div className="bg-white rounded-lg shadow-md">
//         <div className="px-6 py-4 border-b border-gray-200">
//           <h2 className="text-xl font-semibold text-gray-900">
//             Recent Transactions
//           </h2>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Customer
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Type
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Amount
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Balance After
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Date
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {data.recent_transactions.length === 0 ? (
//                 <tr>
//                   <td
//                     colSpan="5"
//                     className="px-6 py-4 text-center text-gray-500"
//                   >
//                     No recent transactions
//                   </td>
//                 </tr>
//               ) : (
//                 data.recent_transactions.map((transaction) => (
//                   <tr key={transaction.id}>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div>
//                         <div className="text-sm font-medium text-gray-900">
//                           {transaction.customer_name}
//                         </div>
//                         <div className="text-sm text-gray-500">
//                           {transaction.customer_email}
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <span
//                         className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                           transaction.type === "deposit"
//                             ? "bg-green-100 text-green-800"
//                             : "bg-red-100 text-red-800"
//                         }`}
//                       >
//                         {transaction.type}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       <span
//                         className={
//                           transaction.type === "deposit"
//                             ? "text-green-600"
//                             : "text-red-600"
//                         }
//                       >
//                         {transaction.type === "deposit" ? "+" : "-"}
//                         {formatCurrency(transaction.amount)}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
//                       {formatCurrency(transaction.balance_after)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                       {formatDate(transaction.created_at)}
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
// {/* //----------------------------------------------------// */}

//     </div>
//   );
// };
//////////////////////////////////////////////
// src/components/banker/BankingOverview.jsx
import React, { useState, useEffect } from "react";
import { bankerAPI } from "../../services/api";
import { formatCurrency, formatDate } from "../../utils/auth";
import { ErrorMessage } from "../common/ErrorMessage";

export const BankingOverview = () => {
  const [data, setData] = useState({
    overview: {
      total_customers: 0,
      total_transactions: 0,
      total_deposits: 0,
      total_withdrawals: 0,
      total_balance: 0,
    },
    recent_transactions: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const response = await bankerAPI.getOverview();
        setData(response.data);
        // eslint-disable-next-line no-unused-vars
      } catch (err) {
        setError("Failed to fetch overview data");
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Banking Overview
        </h1>
        <p className="text-gray-600">
          Monitor your bank's performance and activity
        </p>
      </div>

      <ErrorMessage message={error} onClose={() => setError("")} />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-blue-600 text-xl">👥</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900">
                {data.overview.total_customers}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-green-600 text-xl">💳</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Transactions</p>
              <p className="text-2xl font-bold text-gray-900">
                {data.overview.total_transactions}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-green-600 text-xl">⬆️</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Deposits</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(data.overview.total_deposits)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <span className="text-red-600 text-xl">⬇️</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Withdrawals</p>
              <p className="text-2xl font-bold text-red-600">
                {formatCurrency(data.overview.total_withdrawals)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <span className="text-blue-600 text-xl">💰</span>
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Balance</p>
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(
                  data.overview.total_deposits - data.overview.total_withdrawals
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Recent Transactions
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
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
              {data.recent_transactions.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No recent transactions
                  </td>
                </tr>
              ) : (
                data.recent_transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {transaction.customer_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {transaction.customer_email}
                        </div>
                      </div>
                    </td>
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
