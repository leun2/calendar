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

- [x] User login with JWT & OAuth2
- [x] Basic calendar UI
- [x] Event scheduling
- [ ] Mobile responsiveness *(in progress)*
- [ ] Shared calendars *(TBD)*
- [ ] Push notifications *(TBD)*

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

### Frontend
- React
- TypeScript
- MUI (Material UI)

### Backend
- Spring Boot
- Spring Security (JWT, OAuth2)
- JPA
- MySQL (via AWS RDS)

### Infra
- AWS Route 53 (DNS & domain routing)
- AWS CloudFront (CDN)
- AWS S3 (static assets)
- AWS Elastic Beanstalk (deployment)
- AWS RDS (database)

## Getting Started (Local Dev)

### Prerequisites 

- Node.js
- Java 17+
- Gradle

### Backend

```
cd server
./gradlew bootRun
```

### Frontend

```
cd client
npm install
npm start
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.
