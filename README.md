🏦 Banking App (MERN Stack)



📌 Overview

The Banking App is a full-stack MERN application that enables secure banking operations for both customers and bankers. It features JWT authentication, role-based access control, and transaction management with a modern responsive UI. The project demonstrates a production-style banking system with strong focus on security, scalability, and user experience.

⚛️ Components
👤 Customer Components

Login/Signup Forms – With input validation and error handling

Transactions Dashboard – Displays account balance and transaction history

Deposit/Withdraw Modals – Handles secure deposits and withdrawals with error states

Customer Profile Page – Manage account info and password updates

🏦 Banker Components

Banker Login/Signup – Separate access for banker accounts

Banking Overview – Dashboard with statistics and KPIs

Customer Accounts List – Search and view all registered customers

Customer Transaction Details – Drill down into user transaction history

🔗 Common Components

Header – Role-based navigation for Customers/Bankers

Message Components – Loading, error, and success notifications

Protected Routes – Ensures access based on authentication and role

🎯 Key Features Implemented
🔒 Security & Authentication

JWT Token Management – Secure login with token-based sessions

Role-Based Routing Protection – Restricts access by user role (Customer/Banker)

Automatic Token Refresh – Extends sessions securely

Secure Logout – Token invalidation on sign-out

🎨 User Experience

Modern Tailwind CSS Styling – Clean and professional design

Responsive Design – Works across desktop, tablet, and mobile

Loading States – Smooth feedback during API calls

Success/Error Notifications – Clear messaging for every action

Form Validation – Prevents invalid inputs in login/signup and transactions

🛠️ Tech Stack

Frontend: React.js, Tailwind CSS, Context API/Custom Hooks

Backend: Node.js, Express.js

Database: MongoDB

Authentication: JWT
