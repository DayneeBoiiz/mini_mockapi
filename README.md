# MockAPI

this is a mockAPI clone website built with **Next.js** as the backend and server components, utilizing **Prisma** to communicate with a PostgreSQL database. This project serves as a demonstration of creating a full-stack application that simulates API endpoints for testing and development purposes.

## Features

- **Next.js Backend:** Leverages server-side rendering and API routes for seamless integration.
- **Prisma:** Uses Prisma as an ORM for easy database management and communication.
- **PostgreSQL Database:** Data is stored and managed in a PostgreSQL database.

## Getting Started

To run the project, you'll need to have Docker and Docker Compose installed on your machine. Follow the steps below to set up and run the application:

### 1. Clone the repository

```bash
git clone git@github.com:DayneeBoiiz/mini_mockapi.git
cd <mini_mockapi
```

### 2. Run the Application

```bash
docker-compose up --build
```

This command will:

- **Build** the Docker images for the Next.js application.
- **Start** the PostgreSQL database.
- **Run** the Next.js application, applying any Prisma migrations before starting.