# Bwize - Empowering Young Girls with Online Safety

Bwize is a platform designed to empower young girls to navigate the online world safely through interactive chat simulations. The platform teaches users to identify risks, manage emotions, and make safe decisions in a fun and engaging environment.

## 💡 What Makes Bwize Unique?

- Immersive Design: A dynamic 3D character that reacts to users' decisions.
- Guided Learning: Thought-provoking questions that help build critical online safety habits.
- Powerful Tech Stack: Built with React, Node.js, Google API (for user authentication), and MySQL to store user progress.
- Social Impact: Helping young girls build confidence, resilience, and make safe choices online.

## 🚀 Features

- User Authentication: Users can sign up and log in using Google authentication.
- Interactive Chat Simulation: The chat simulation teaches users how to handle different online scenarios.
- Review and Feedback: After completing a simulation, users receive feedback to reinforce learning.
- User Progress Tracking: The platform stores user information, including chat history and progress, in a MySQL database (That version *doesn’t* include the database implementation).

## 🛠️ Technology Stack

- Frontend: React, Vite
- Backend: Node.js, Express
- Authentication: Passport.js with Google API
- Database: MySQL
- Environment: Environment variables for API keys, session secrets, and DB configurations.

## 📝 Installation

### Prerequisites

- [Node.js](https://nodejs.org/en) 
  - Version 20.x or higher required (latest LTS recommended)
- `npm` (will be installed automatically with Node.js)
  - Version 10.x or higher

### Clone the Repository

1. **Clone the repository**:
   - Create a project from this repository by clicking on `Use this template` -> `Create a new repository`.
   - Clone the new repository to your local machine.

2. **Set up the project**:
   - Navigate to the root directory of the project in your terminal.

### Server Setup

1. Navigate to the `server` folder:
   cd server
2. Install server dependencies:
   npm install
3. Set up the environment variables:
   -Make a copy of .env.example and rename it .env.
   -Update the .env file with your specific credentials and configuration details, including the database and Google API credentials.
   Example:
   PORT=5000
   CLIENT_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
   GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
   GOOGLE_CALLBACK_URL=http://localhost:5000/auth/google/callback
   SESSION_SECRET=YOUR_SESSION_SECRET
   DB_HOST=localhost
   DB_USER=root
   DB_NAME=hack
   DB_PASSWORD=YOUR_DB_PASSWORD
   DB_PORT=3306

### Client Setup

1. Navigate to the `client` folder:
   cd client
2. Install client dependencies:
   npm install

#### 🔧 Usage

1. Running the Server:
   - Open a terminal in the server directory:
   cd server
   - Start the server in development mode:
   npm run dev
   The server will be running at http://localhost:5000 by default.

2. Running the Client:
   - Open a terminal in the client directory:
   cd client
   - Start the client in development mode:
   npm run dev
   The frontend will open in your browser at http://localhost:3000.

#### Testing the Application
Authentication: Use the Google login to sign up or log in to the platform.
Chat Simulation: Interact with the chat simulation, where you’ll learn to make safe online decisions.
Review: After completing a chat, review your responses and get feedback on how to improve your online safety habits.

##### Stopping the Servers
Stop the Express Server: In the terminal where the server is running, press Ctrl + C.
Stop the React Client: In the terminal where the client is running, press Ctrl + C.

##### 🗂️ Project Structure

Client Directory (client/)
Contains the React (Vite) frontend application:
- package.json: Lists the client-side dependencies and scripts for managing the React application.
- .env: Stores environment variables like the API endpoint URL.
- index.html: The main HTML page hosting the React components.
- public/: Static assets, that do not require processing by Vite.
- 3d-model: Stores the different states of the 3D character model.
- src/: Contains the source code for the React application.
- assets/: Static assets, logo.
- components/: Reusable UI components.
- pages/: Represents different routes in the application.
- services/: Handles API calls and business logic.
- styles/: CSS files for styling.
- App.jsx: Main React component that sets up routing and renders the app.
- index.jsx: The entry point that renders the app into the DOM.

Server Directory (server/)
Contains the Node.js backend application:
- package.json: Lists the server-side dependencies and scripts for managing the Express app.
- .env: Stores environment variables like Google API credentials and database connection details.
- server.js: Main server file that sets up Express and starts the backend.
- chatFlow.json: Stores the logic of the chat flow.

###### 💬 Troubleshooting
- Server Issues:
Ensure the Express server is running without errors and that no other applications are using port 5000.
Check the terminal for any errors related to the backend (database connection, API issues).
- Client Issues:
Ensure the React development server is running and accessible on http://localhost:3000.
Open browser developer tools and check for any errors in the console or network logs.

###### 🎯 Next Steps & Future Features
- Explore the possibility of adding more chat scenarios and branching storylines for a richer user - experience.
Implement a leaderboard system to track users’ progress in online safety simulations.

