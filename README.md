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



🚀 Getting Started


1️⃣ Clone the Repository

git clone https://github.com/jai01019/BankingSystem.git
cd banking-system

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd frontend2
npm install


.env

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000


📸 Screenshots

customer dashboard 
<img width="1465" height="905" alt="image" src="https://github.com/user-attachments/assets/b2f6d7e7-b74f-49ac-9c62-94c4cd03d664" />

deposit 
<img width="1472" height="917" alt="image" src="https://github.com/user-attachments/assets/c82b1d85-79d8-4aea-8c6f-3b158cc77413" />

withdrawal
<img width="1465" height="902" alt="image" src="https://github.com/user-attachments/assets/d1140e23-bd42-48c6-8bb1-dc84e531bc35" />

bank dashboard 

<img width="1466" height="915" alt="image" src="https://github.com/user-attachments/assets/47481e0d-ad4c-4ffc-b621-e14262fff73b" />



