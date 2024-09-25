# 🚀 Warehouse Management REST API

This is a REST API for managing warehouse operations built with **ExpressJS** and **TypeScript**, integrated with **PostgreSQL** for data management. The API supports operations for managing Users, Items, and Mutations (inbound/outbound stock movements).

## 🛠 Prerequisites

Before you start, ensure that you have the following tools installed on your machine:

- **Node.js** (version 18 or later)
  - [Download Node.js](https://nodejs.org/en/download/)
- **npm** (comes with Node.js)
  - Verify installation: `npm -v`
- **PostgreSQL** (version 13 or later)
  - [Download PostgreSQL](https://www.postgresql.org/download/)
  - Ensure your database is set up and running with the following credentials (you can adjust these in the environment variables):
    - **Username**: `postgres`
    - **Password**: `password`
    - **Database**: `mydb`
    - **Port**: `5432`

## 📦 Project Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
2. **Install dependencies**:
   
   Make sure you're inside the project directory and run:

   ```bash
   npm install
3. Configure Environment Variables:
   
   Create a .env file in the root directory with your PostgreSQL connection details and other environment variables:

   ```bash
   DATABASE_URL=postgres://postgres:password@localhost:5432/mydb
4. Prisma Setup:
   
   This project uses Prisma ORM for interacting with the PostgreSQL database. Generate Prisma client by running:

   ```bash
   npx prisma generate
   ```
   Apply database migrations:

   ```bash
    npx prisma migrate dev
   
## 🚀 Running the Application
1. Build the project:

   This project is written in TypeScript. To compile the TypeScript code into JavaScript, run:
   ```bash
   npm run build

3. Start the application

   Once the project is built, you can start the server with:

   ```bash
   npm run start

5. Development mode:

   If you want to start the server in development mode with live-reloading using nodemon, run:
   ```bash
   npm run dev
## Postman Documentation: 

[https://documenter.getpostman.com/view/17710250/2sAXqwZKwG](https://documenter.getpostman.com/view/17710250/2sAXqwZKwG)
