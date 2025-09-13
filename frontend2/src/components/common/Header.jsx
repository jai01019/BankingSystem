// // src/components/common/Header.jsx
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";

// const Header = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   return (
//     <header className="bg-blue-600 text-white shadow-md">
//       <div className="px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex items-center space-x-8">
//             <h1 className="text-xl font-bold">SecureBank</h1>

//             {user?.role === "customer" && (
//               <nav className="flex space-x-4">
//                 <Link
//                   to="/customer/dashboard"
//                   className="hover:bg-blue-700 px-3 py-2 rounded-md"
//                 >
//                   Dashboard
//                 </Link>
//                 <Link
//                   to="/customer/profile"
//                   className="hover:bg-blue-700 px-3 py-2 rounded-md"
//                 >
//                   Profile
//                 </Link>
//               </nav>
//             )}

//             {user?.role === "banker" && (
//               <nav className="flex space-x-4">
//                 <Link
//                   to="/banker/overview"
//                   className="hover:bg-blue-700 px-3 py-2 rounded-md"
//                 >
//                   Overview
//                 </Link>
//                 <Link
//                   to="/banker/accounts"
//                   className="hover:bg-blue-700 px-3 py-2 rounded-md"
//                 >
//                   Accounts
//                 </Link>
//               </nav>
//             )}
//           </div>

//           <div className="flex items-center space-x-4">
//             <span className="text-sm">Welcome, {user?.name}</span>
//             <button
//               onClick={handleLogout}
//               className="bg-blue-700 hover:bg-blue-800 px-3 py-2 rounded-md text-sm"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
//////////////////////////////
// src/components/common/Header.jsx
// // src/components/common/Header.jsx
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";

// const Header = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   return (
//     <header className="bg-blue-600 text-white shadow-md w-full min-w-full block">
//       <div className="w-full min-w-full px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           <div className="flex items-center space-x-8">
//             <h1 className="text-xl font-bold">SecureBank</h1>
//             {user?.role === "customer" && (
//               <nav className="flex space-x-4">
//                 <Link
//                   to="/customer/dashboard"
//                   className="hover:bg-blue-700 px-3 py-2 rounded-md"
//                 >
//                   Dashboard
//                 </Link>
//                 <Link
//                   to="/customer/profile"
//                   className="hover:bg-blue-700 px-3 py-2 rounded-md"
//                 >
//                   Profile
//                 </Link>
//               </nav>
//             )}
//             {user?.role === "banker" && (
//               <nav className="flex space-x-4">
//                 <Link
//                   to="/banker/overview"
//                   className="hover:bg-blue-700 px-3 py-2 rounded-md"
//                 >
//                   Overview
//                 </Link>
//                 <Link
//                   to="/banker/accounts"
//                   className="hover:bg-blue-700 px-3 py-2 rounded-md"
//                 >
//                   Accounts
//                 </Link>
//               </nav>
//             )}
//           </div>
//           <div className="flex items-center space-x-4">
//             <span className="text-sm">Welcome, {user?.name}</span>
//             <button
//               onClick={handleLogout}
//               className="bg-blue-700 hover:bg-blue-800 px-3 py-2 rounded-md text-sm"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
//-----------------------------------------------------------//
// src/components/common/Header.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg border-b border-blue-500">
      <div className="w-full min-w-full px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Left Section - Logo and Navigation */}
          <div className="flex items-center space-x-12">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-blue-600 font-bold text-lg">$</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight">SecureBank</h1>
            </div>

            {/* Navigation */}
            {user?.role === "customer" && (
              <nav className="hidden md:flex space-x-1">
                <Link
                  to="/customer/dashboard"
                  className=" bg-gray-300 hover:bg-orange-500 hover:bg-opacity-50 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
                >
                  Dashboard
                </Link>
                <Link
                  to="/customer/profile"
                  className="bg-gray-300 hover:bg-orange-500 hover:bg-opacity-50 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
                >
                  Profile
                </Link>
              </nav>
            )}

            {user?.role === "banker" && (
              <nav className="hidden md:flex space-x-1">
                <Link
                  to="/banker/overview"
                  className=" bg-gray-200 hover:bg-blue-500 hover:bg-opacity-50 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
                >
                  Overview
                </Link>
                <Link
                  to="/banker/accounts"
                  className=" bg-gray-200 hover:bg-blue-500 hover:bg-opacity-50 px-4 py-2 rounded-lg transition-all duration-200 font-medium"
                >
                  Accounts
                </Link>
              </nav>
            )}
          </div>

          {/* Right Section - User Info and Logout */}
          <div className="flex items-center space-x-6">
            {/* User Welcome */}
            <div className="hidden sm:flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white border-opacity-20">
                <span className="text-white font-bold text-sm">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-blue-50">
                  Welcome back,
                </span>
                <span className="text-xs text-blue-100 font-medium">
                  {user?.name}
                </span>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border border-red-400 border-opacity-30 flex items-center space-x-2"
            >
              <span>🚪</span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
