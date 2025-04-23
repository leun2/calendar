# calendar

A web-based calendar app inspired by Google Calendar.  
Supports JWT & OAuth2 login, event scheduling, and a fully responsive UI.

[https://calendar.leun2.com](https://calendar.leun2.com)

---

## Preview

<div align="center">
  <img src="https://calendar-front-dev.s3.ap-northeast-2.amazonaws.com/images/signIn.gif" width="400"/>
  <img src="https://calendar-front-dev.s3.ap-northeast-2.amazonaws.com/images/viewselector.gif" width="400"/>
</div>
<br>
<div align="center">
  <img src="https://calendar-front-dev.s3.ap-northeast-2.amazonaws.com/images/createEvent.gif" width="400"/>
  <img src="https://calendar-front-dev.s3.ap-northeast-2.amazonaws.com/images/eventDetails.gif" width="400"/>
</div>

---

## Features

- [x] User login with JWT & OAuth2
- [x] Basic calendar UI
- [x] Event scheduling
- [ ] Mobile responsiveness *(planned)*
- [ ] Shared calendars *(TBD)*
- [ ] Push notifications *(TBD)*

---

## Tech Stack

- **Frontend**: React, TypeScript, MUI
- **Backend**: Spring Boot, Java, JPA (Hibernate), Spring Security, JWT, OAuth2
- **Database**: MySQL (via RDS)
- **Infra**: AWS (S3, CloudFront, Elastic Beanstalk)

## ⚙️ Tech Stack

### Frontend
- React + TypeScript
- Tailwind CSS
- MUI (Material UI)
- Recoil

### Backend
- Spring Boot
- Spring Security (JWT, OAuth2)
- **JPA (Hibernate)**
- MySQL (AWS RDS)

### DevOps / Infra
- AWS S3 (static assets)
- AWS CloudFront (CDN)
- AWS Elastic Beanstalk (deployment)

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
