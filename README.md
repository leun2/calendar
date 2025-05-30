# calendar

A web-based calendar application inspired by Google Calendar. 
It supports secure user authentication (JWT & OAuth2) and provides an intuitive UI for easily managing events and planning your schedule. 
Responsive UI and various features are currently under development.

## Preview

Take a look at the project's core features in action.

<div align="center">
  <img 
    src="https://calendar.io.kr/images/signIn.gif" 
    width="400" 
    alt="Sign In"/>
  <img 
    src="https://calendar.io.kr/images/viewselector.gif" 
    width="400" 
    alt="View Select"/>
</div>
<div align="center">
  <img 
    src="https://calendar.io.kr/images/createEvent.gif" 
    width="400" 
    alt="Create Event"/>
  <img 
    src="https://calendar.io.kr/images/eventDetails.gif" 
    width="400"
    alt="Delete Event" />
</div>

## Website

Check out the deployed version [here](https://calendar.io.kr).

## Features

A list of key functionalities and technical implementations supported by the project.

- User Authentication & Management:

  - JWT & OAuth2-based Login: Supports standard user registration via email/password, as well as seamless login through Google social accounts.
  - RESTful API for User Management: Developed a comprehensive set of RESTful APIs (CRUD operations: Create, Read, Update, Delete) for managing user accounts

- Event & Task Scheduling:

  - RESTful API for Event & Task Management: Implemented robust RESTful APIs for all CRUD operations related to events and tasks, enabling users to efficiently manage their schedule data.
  - Basic Calendar UI: Provides intuitive calendar views by day, week, and month, offering clear visual organization of scheduled items.
  - Event Scheduling: Allows users to effortlessly create, modify, and delete events directly within the application.

- User Interface (UI):

  - Mobile Responsive UI (In Progress): Currently developing a responsive user interface to ensure an optimized layout and experience across various device sizes.

- Planned / Future Features:

  - Shared Calendars: Future implementation to enable sharing calendars with other users for collaborative schedule management (TBD).
  - Push Notifications: Future feature for event start reminders and other timely alerts via push notifications (TBD).

## Tech Stack

This project is built with the following technologies.

### Frontend
- **React:** JavaScript library for building user interfaces.
- **TypeScript:** Ensures code stability through static type checking.
- **MUI (Material UI):** Utilizes a UI component library based on Google Material Design.

### Backend
- **Spring Boot:** Framework for fast and easy backend application development.
- **Spring Security (JWT, OAuth2):** Implements robust authentication and authorization features.
- **JPA:** Abstraction of database access through Object-Relational Mapping (ORM).
- **MySQL:** Relational database management system (Deployed to production via AWS RDS).

### Infra
- **AWS Route 53:** Manages Domain Name System (DNS).
- **AWS CloudFront:** Content Delivery Network (CDN) for performance improvement and reduced loading times.
- **AWS S3:** Stores and hosts static assets (images, CSS, JS, etc.) for the website.
- **AWS Elastic Beanstalk:** Automates the deployment and management of web applications.
- **AWS RDS:** Managed relational database service (using a MySQL instance).

## Getting Started (Local Development)

A guide for setting up and running the project in your local environment.

### Prerequisites

The following are required to build and run the project:

- Node.js (LTS version recommended)
- Java 17+
- Gradle

### Backend

1.  Navigate to the `server` directory.
2.  **Configure Local Settings in application.yml:**
    * Navigate to `server/src/main/resources/application.yml`.
    * Find the section commented with `# Local`. This block contains all configuration specifically for the local development environment, including database settings, OAuth keys, and JWT secret.
    * Uncomment the entire `# Local` block by removing the `#` symbol from the beginning of each line within that block. This enables the local configuration profile which is set up to read values from environment variables using `${...}` syntax.
3.  **Set Up Environment Variables (.env):**
    * The local configuration enabled in Step 2 reads all necessary settings (database credentials, OAuth2 keys, JWT secret) from environment variables, typically provided via a `.env` file during local development (thanks to `spring.config.import` in your `application.yml`).
    * Create or open the `.env` file located in the `server/src/main/resources` directory.
    * Add the following variables to the `.env` file, filling in your actual details for your local MySQL database and application secrets:
        ```dotenv
        # Database Credentials (Used in application.yml's 'Local' section)
        DB_NAME=your_local_database_name # e.g., calendar
        DB_USERNAME=your_local_database_user
        DB_PASSWORD=your_local_database_password

        # OAuth2 Credentials (Used in application.yml's 'Local' section)
        GOOGLE_CLIENT_ID=your_Google_Client_ID
        GOOGLE_CLIENT_SECRET=your_Google_Client_Secret
        GOOGLE_REDIRECT_URI=your_Google_Redirect_URI  # e.g., http://localhost:8080/login/oauth2/code/google

        # JWT Secret (Used in application.yml's 'Local' section)
        JWT_SECRET_KEY=a_long_and_secure_JWT_Secret_Key
        ```
    **⚠️ Important:** The `.env` file contains sensitive information like credentials and secrets. **Make sure to add `src/main/resources/.env` to your `.gitignore` file** located in the `server` directory to prevent it from being committed to your Git repository.
4.  Run the application using Gradle.
    ```bash
    cd server
    ./gradlew bootRun
    ```

### Frontend

1.  Navigate to the `client` directory.
2.  Install the dependency packages.
    ```bash
    cd client
    npm install
    ```
3.  Start the development server.
    ```bash
    npm start
    ```
4.  Access the application in your browser at `http://localhost:3000`.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
