# calendar

 A full-stack calendar application featuring user authentication, event scheduling, and responsive UI.

## Preview

<img src="https://calendar-front-dev.s3.ap-northeast-2.amazonaws.com/images/signIn.gif" width="400"/>
<img src="https://calendar-front-dev.s3.ap-northeast-2.amazonaws.com/images/viewselector.gif" width="400"/>
<br>
<img src="https://calendar-front-dev.s3.ap-northeast-2.amazonaws.com/images/createEvent.gif" width="400"/>
<img src="https://calendar-front-dev.s3.ap-northeast-2.amazonaws.com/images/eventDetails.gif" width="400"/>

## Features

- [x] User login with JWT & OAuth2
- [x] Basic calendar UI
- [x] Event scheduling
- [x] Mobile responsiveness
- [ ] Recurring events *(coming soon)*
- [ ] Email notifications *(planned)*
- [ ] Shared calendars *(TBD)*

## Tech Stack

- **Frontend**: React, TypeScript, MUI
- **Backend**: Spring Boot, Java, JPA (Hibernate), Spring Security, JWT, OAuth2
- **Database**: MySQL (via RDS)
- **Infra**: AWS (S3, CloudFront, Elastic Beanstalk)

## Getting Started

### Prerequisites

- Node.js
- Java 17+
- Gradle

### Installation

#### Backend

```
cd server
./gradlew bootRun
```

#### Frontend

```
cd client
npm install
npm start
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.
