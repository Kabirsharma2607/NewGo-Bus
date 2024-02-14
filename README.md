# NewGo Travels - Bus Booking System

NG Travels is a web-based bus booking system that allows users to view available buses, make bookings, and manage their reservations. The project is built using React for the frontend and Node.js with Express for the backend.

## Features

- View available buses with details such as name, origin, destination, fare, and journey date.
- Book seats on a specific bus for a selected journey.
- View and manage booking history.
- Admin functionality to manage buses, users, and bookings.

## Tech Stack

- **Frontend:**

  - React
  - Ant Design (UI Components)
  - Redux (State Management)

- **Backend:**
  - Node.js
  - Express
  - MongoDB (Database)
  - Mongoose (ODM)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js: [Download Node.js](https://nodejs.org/)
- MongoDB: [Download MongoDB](https://www.mongodb.com/try/download/community)

## Getting Started

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Kabirsharma2607/NewGo-Bus
   ```

2. **Install Dependencies:**

   #### Navigate to the project directory
   ```
   cd "NewGo-Bus"
   ```
   #### Install frontend dependencies
   ```bash
   cd client
   npm install
   ```
   #### Install backend dependencies
   ```
   cd ..
   npm install
   ```

4. **Configure Environment Variables:**
   Create a .env file in the backend directory.
   Add the following environment variables:

   ```bash
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   ```

5. **Run the Application:**

   #### Start the backend server
  ```
   cd ..
   npm start
  ```
   #### Start the frontend development server
  ```
   cd client
   npm start
  ```
5. **Access the Application:**
   Open your browser and visit `http://localhost:3000` to access the NG Travels web application.

6. **Project Structure:**
   <br />
   client/: Contains the React frontend code. <br />
   parent/: Contains the Node.js and Express backend code.
