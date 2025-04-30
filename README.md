# Fullstack Rust NextJS Application

![React](https://img.shields.io/badge/ReactJS-v18-blue.svg)
![Next](https://img.shields.io/badge/NextJS-v14.2.28-black.svg)
![Axios](https://img.shields.io/badge/Axios-v1.9.0-yellow.svg)
![Tailwind](https://img.shields.io/badge/TailwindCSS-v1.9.0-lightblue.svg)
![Typescript](https://img.shields.io/badge/Typescript-v5-dodgerblue.svg)
![Rust](https://img.shields.io/badge/Rust-v1.86.0-orange.svg)
![Docker](https://img.shields.io/badge/Docker-darkblue.svg)

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Installation](#installation)

## Project Overview

This project is a full-stack web application built with **Rust** for the backend and **Next.js** for the frontend.

It demonstrates a modern approach to building web applications with a focus on performance, scalability, and developer productivity. The application uses **PostgreSQL** as the database and is containerized using **Docker** for easy deployment.

## Technologies Used

- **Frontend:** ReactJS, NextJS.
- **Backend:** Rust.
- **Library:** Axios.
- **Styling:** TailwindCSS.

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/SandroSD/fullstack-rust-live.git
   ```

2. **Navigate to the project directory:**

   ```sh
   cd fullstack-rust-live
   ```

3. **Ensure that the DATABASE_URL environment variable in the [compose.yaml](compose.yaml) file is correctly configured to point to the PostgreSQL data.**

4. **Build and Start the Containers**

   ```sh
   docker-compose up --build
   ```

   > This will:
   >
   > - Build the docker images for the frontend and backend.
   > - Start the PostgreSQL database container.
   > - Start the frontend and backend containers.

5. **Verify the Containers (OPTIONAL):**

   ```sh
   docker ps
   ```

   > After running this command, you should see three containers: `nextapp`, `rustapp` and `db`.

6. **Access the Application:**

- **Frontend:** Open [http://localhost:3000](http://localhost:3000) in your browser.
- **Backend:** Access [http://localhost:8080](http://localhost:8080).

7. **Verify the Database:**

   To ensure the database is set up correctly:

   1. Connect to the database container
      ```sh
      docker exec -it db psql -U postgres
      ```
   2. Check the tables

      ```sh
      \dt
      ```

      > For this particular project, you should see `users` table if the backend initialized the database correctly.

8. **If you want to stop the containers:**

   To stop the containers, press `CTRL + C` in the terminal where `docker-compose up` is running, or use:

   ```sh
   docker-compose down
   ```

9. **Clean Up: (OPTIONAL)**

   If you want to remove all containers, images, and volumes:

   ```sh
   docker-compose down --volumes --rmi all
   ```
