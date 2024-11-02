# Backend Project

This is the backend service for the project, built with Node.js, Express, and PostgreSQL.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/Hinkywan/nexplore-technical-test.git
    cd backend
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Set up the environment variables. Create a `.env` file in the root directory and add the following variables:

    ```env
    DB_USER=your_db_user
    DB_HOST=your_db_host
    DB_NAME=your_db_name
    DB_PASSWORD=your_db_password
    DB_PORT=5432
    PORT=5000
    CORS_ORIGIN=http://localhost:3000
    ```

4. Start the Docker containers:

    ```sh
    docker-compose up -d
    ```

    This will start the PostgreSQL database and any other services defined in the `docker-compose.yml` file.

## Configuration
The application uses a PostgreSQL database, which is installed and managed via Docker. Ensure that Docker is installed and running on your machine. The database connection can be configured in the `.env` file.

## Running the Application

1. Run database migrations:

    ```sh
    npm run migrate
    ```

2. Start the application:

    ```sh
    npm run dev
    ```

    The server will start on the port specified in the [.env](http://_vscodecontentref_/1) file (default is 5000).

## Running Tests

To run the tests, use the following command:

```sh
npm test
```

## API Endpoints

The following are the available API endpoints:

### Create Duty

**POST** `/api/duties`

**Request Body:**
```json
{
    "name": "string",
    "title": "string",
    "description": "string",
    "status": "string"
}
```

**Response:**
- `201 Created`

### Get All Duties

**GET** `/api/duties`

**Response:**
- `200 OK`

### Get Duty by ID

**GET** `/api/duties/:id`

**Response:**
- `200 OK`

### Update Duty

**PUT** `/api/duties/:id`

**Request Body:**
```json
{
    "name": "string",
    "title": "string",
    "description": "string",
    "status": "string"
}
```

**Response:**
- `200 OK`

### Delete Duty

**DELETE** `/api/duties/:id`

**Response:**
- `204 No Content`

## Project Structure
The project structure is as follows:
```
  backend/
  ├── src/
  │   ├── app.ts
  │   ├── config/
  │   ├── controllers/
  │   ├── entity/
  │   ├── interfaces/
  │   ├── middlewares/
  │   ├── models/
  │   ├── routes/
  │   ├── services/
  │   └── utils/
  ├── migrations/
  ├── scripts/
  ├── tests/
  │   ├── controllers/
  │   ├── models/
  │   └── services/
  ├── .env
  ├── .env.example
  ├── .gitignore
  ├── package.json
  ├── package-lock.json
  ├── docker-compose.yml
  ├── README.md
  └── tsconfig.json
```

## License
This project is for technical evaluation purposes only. The license for this project is not defined.