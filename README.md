
---

# Job Application Full-Stack Project

This project is a comprehensive job application management system that enables users to view and apply for job listings while providing administrators with the tools to manage these listings efficiently. Built with modern web technologies, this system features a React.js frontend, a Node.js/Express.js backend, and a MySQL database.

## 📂 Project Structure

The project is divided into two primary directories:

- **`frontend`**: Contains the React.js code for the user interface.
- **`backend`**: Contains the Node.js/Express.js code for the backend API and database interactions, with Redux used for state management.

## 🚀 Features

### Admin Panel

- **📝 Jobs Form Page**: Admins can post new job listings by filling out a form with the following details:
  - Company Name
  - Position
  - Contract Type
  - Location
  - Job Description

- **📊 Jobs Listing Page**: Admins can view, edit, and delete job listings. The job data is presented in a user-friendly table format.

### User Panel

- **🔍 Jobs Page**: Users can browse all job listings with features to:
  - Search by Company Name
  - Filter by Location and Contract Type
  - Apply for Jobs

- **📋 Applied Jobs Page**: Users can view the job listings they have applied for.

![Jobs Page](https://github.com/user-attachments/assets/5f72d9b8-f26e-4e88-bb57-ca0eafc3baeb)
![Applied Jobs](https://github.com/user-attachments/assets/b72d2f64-aa89-432a-8438-e721d58981e8)
![Job Listings](https://github.com/user-attachments/assets/acef47cd-d2a3-4b6f-80f4-ae7c504a7aaa)
![Job Form](https://github.com/user-attachments/assets/13e0bd58-444d-4664-bfaf-d75602a0c31f)
![Job Details](https://github.com/user-attachments/assets/0667fa74-ee09-4335-901f-267ae89c5f2c)

## 🛠️ Installation and Setup

### Prerequisites

Ensure the following software is installed:

- [Node.js](https://nodejs.org/) (v12 or later)
- [MySQL](https://www.mysql.com/) (for database management)

### Backend Setup

1. **Navigate to the backend directory:**

   ```bash
   cd backend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Configure the Database:**

   Create a `.env` file in the `backend` directory with the following content:

   ```bash
   DB_HOST=127.0.0.1
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=jobapp
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the Backend Server:**

   ```bash
   npm start
   # or
   node index.js
   ```

   The backend server will be accessible at [http://localhost:5000](http://localhost:5000).

### Frontend Setup

1. **Navigate to the frontend directory:**

   ```bash
   cd frontend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Build the Frontend:**

   ```bash
   npm run build
   ```

   This creates an optimized production build in the `build` directory.

4. **Run the Frontend in Development Mode (optional):**

   ```bash
   npm start
   ```

   The frontend will be accessible at [http://localhost:3000](http://localhost:3000).

### Running the Project

1. Start the backend server by navigating to the `backend` directory and running:

   ```bash
   npm start
   ```

2. Serve the frontend build. You can deploy it on a service like Netlify or serve it locally using:

   ```bash
   npm install -g serve
   serve -s build
   ```

   Open your browser to [http://localhost:5000](http://localhost:5000) (or wherever your backend is running).

---
