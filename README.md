# calendar

A web-based calendar application inspired by Google Calendar. 
It supports secure user authentication (JWT & OAuth2) and provides an intuitive UI for easily managing events and planning your schedule. 
Responsive UI and various features are currently under development.

## Preview

Take a look at the project's core features in action.

<div align="center">
  <img 
    src="https://calendar-front-dev.s3.ap-northeast-2.amazonaws.com/images/signIn.gif" 
    width="400" 
    alt="Sign In"/>
  <img 
    src="https://calendar-front-dev.s3.ap-northeast-2.amazonaws.com/images/viewselector.gif" 
    width="400" 
    alt="View Select"/>
</div>
<div align="center">
  <img 
    src="https://calendar-front-dev.s3.ap-northeast-2.amazonaws.com/images/createEvent.gif" 
    width="400" 
    alt="Create Event"/>
  <img 
    src="https://calendar-front-dev.s3.ap-northeast-2.amazonaws.com/images/eventDetails.gif" 
    width="400"
    alt="Delete Event" />
</div>

## Website

You can try out the currently deployed version at the link below.

[Website](https://calendar.leun2.com)

## Features

A list of features supported by the project.

- [x] **User login with JWT & OAuth2:** Supports standard sign-up as well as easy login using a Google account.
- [x] **Basic calendar UI:** Provides basic calendar views by day, week, and month.
- [x] **Event scheduling:** Allows users to create, modify, and delete events.
- [ ] **Mobile responsiveness:** Responsive UI is under development to provide an optimized layout across various device sizes. (In progress)
- [ ] **Shared calendars:** Feature to share calendars with other users and manage schedules collaboratively (TBD).
- [ ] **Push notifications:** Feature for push notifications for event start reminders, etc. (TBD).

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
2.  **Configure Database Connection in application.yml:**
    * Prepare your local MySQL database instance.
    * Open the `server/src/main/resources/application.yml` file and locate the `Local` section.
    * **Important:** Ensure that the `spring.datasource` settings within this section are configured to read database credentials from environment variables using placeholders, like this:
        ```yaml
        spring:
          # ... other settings ...
          datasource:
            url: jdbc:mysql://localhost:3306/${DB_NAME} # Or your MySQL host
            username: ${DB_USERNAME}
            password: ${DB_PASSWORD}
            driver-class-name: com.mysql.cj.jdbc.Driver
          # ... rest of Local section ...
        ```
    * If it's not already configured this way, modify it to use placeholders so credentials can be loaded from your `.env` file.
3.  **Set Up Environment Variables (.env):**
    * Sensitive information and database credentials will be loaded from environment variables, typically provided via a `.env` file during local development (thanks to `spring.config.import` in your `application.yml`).
    * Create or open the `.env` file located in the `server/src/main/resources` directory.
    * Add or verify the necessary variables in the following format, filling in your actual details:
        ```dotenv
        # Database Credentials (ensure application.yml uses placeholders like ${DB_NAME})
        DB_NAME=your_local_database_name # e.g., calendar
        DB_USERNAME=your_local_database_user
        DB_PASSWORD=your_local_database_password

        # OAuth2 & JWT Secrets
        GOOGLE_CLIENT_ID=your_Google_Client_ID
        GOOGLE_CLIENT_SECRET=your_Google_Client_Secret
        GOOGLE_REDIRECT_URI=your_Google_Redirect_URI  # e.g., http://localhost:8080/login/oauth2/code/google
        JWT_SECRET_KEY=a_long_and_secure_JWT_Secret_Key
        ```
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
