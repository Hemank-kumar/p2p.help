# P2P Learning Platform

This is a full-stack web application for a peer-to-peer learning and teaching platform. It allows users to browse courses, register for them, and contact the administrators. It also includes an admin panel for managing courses.

## Features

- **Frontend:** A responsive and user-friendly interface built with React and Vite.
- **Backend:** A robust RESTful API built with Node.js and Express.
- **Admin Panel:** A secure section for administrators to manage courses and view registrations.
- **Course Management:** Full CRUD (Create, Read, Update, Delete) functionality for courses.
- **User Interaction:** Pages for learning, teaching, and contacting support.

## Tech Stack

- **Frontend:**
  - React.js
  - Vite
  - CSS3

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB 
  - Mongoose

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (which includes npm)
- [MongoDB](https://www.mongodb.com/try/download/community)

## Getting Started

Follow these steps to get the project up and running on your local machine.

### 1. Clone the repository

```bash
git clone https://github.com/Hemank-kumar/p2p.help.git
cd p2p
```

### 2. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create a .env file in the backend directory
# and add the following environment variables:
# PORT=5000
# MONGODB_URI=your_mongodb_connection_string

# Start the backend server
npm start
```

### 3. Frontend Setup

```bash
# Navigate to the frontend directory from the root
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm run dev
```

The application should now be running, with the frontend available at `http://localhost:5173` (or another port specified by Vite) and the backend running on `http://localhost:5000`.

## Run Commands

### Backend

- **Development:** `npm run dev` - Starts the server with Nodemon for automatic restarts.
- **Production:** `npm start` - Starts the server in a production environment.
- **Tests:** `npm test` - Runs the test suite (if configured).

### Frontend

- **Development:** `npm run dev` - Starts the Vite development server.
- **Production Build:** `npm run build` - Creates a production-ready build of the app.
- **Preview Production Build:** `npm run preview` - Serves the production build locally for testing.

## Key Modules

### Backend

- **Express.js:** A minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.
- **Mongoose:** An Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.
- **jsonwebtoken:** An implementation of JSON Web Tokens for authentication.
- **bcryptjs:** A library to help you hash passwords.

### Frontend

- **React:** A JavaScript library for building user interfaces.
- **Vite:** A build tool that aims to provide a faster and leaner development experience for modern web projects.
- **React Router:** A standard library for routing in React. It enables the navigation among views of various components in a React Application, allows changing the browser URL, and keeps the UI in sync with the URL.
- **Axios:** A promise-based HTTP client for the browser and Node.js. It is used to make HTTP requests to the backend API.
- **Framer Motion:** A production-ready motion library for React. It provides easy-to-use animations and gestures.

## Folder Structure

```
p2p/
├── backend/            # Node.js & Express API
│   ├── models/         # Mongoose data models
│   ├── middleware/     # Custom middleware
│   ├── routes/         # API routes
│   └── index.js        # Server entry point
└── frontend/           # React.js client
    ├── src/
    │   ├── components/ # Reusable UI components
    │   ├── pages/      # Page components
    │   ├── App.jsx     # Main app component
    │   └── main.jsx    # Client entry point
    └── ...
```
