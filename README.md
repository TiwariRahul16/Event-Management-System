# Event Management System

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## Overview

The **Event Management System (EMS)** is a web application designed to help users create, manage, and participate in various events. Users can sign up, log in, create events, update event details, and manage their profile. Additionally, event creators can manage and delete their events. 

The system also offers features like user profile management, event listings, and a dashboard to view and manage user-specific events.

## Features

- **User Authentication**: Secure signup and login functionality using email and password.
- **Event Creation**: Users can create new events with details such as event name, speaker, date, time, address, and ticket price.
- **Event Management**: Event creators can update and delete their events.
- **Profile Management**: Users can update their profile information including first name, last name, email, phone number, profile picture, and cover picture.
- **Responsive Design**: Fully responsive interface, providing a seamless experience across devices.

## Tech Stack

**Frontend**:
- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)

**Backend**:
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

**Other Tools**:
- [NextAuth.js](https://next-auth.js.org/) for authentication
- [Mongoose](https://mongoosejs.com/) for MongoDB object modeling
- [Cloudinary](https://cloudinary.com/) for image hosting (if applicable)
- [GitHub](https://github.com/) for version control

## Installation

### Prerequisites
- Node.js (v14 or above)
- MongoDB (local or cloud-based)
- Git

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```
2. Install dependencies:

     ```bash
    npm install
   ```
3. Set up environment variables:

     ```bash
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database-name>?retryWrites=true&w=majority
   NEXTAUTH_SECRET=<your-secret-key>
   NEXTAUTH_URL=http://localhost:3000
   GITHUB_ID=<Your Github_Id >
   GITHUB_SECRET=<Your Github_SECRET >
   ```
4. Start the development server:

     ```bash
   npm run dev
   ```

5. The app will be running on http://localhost:3000


## Usage

### Event Creation

1. Go to the "Create Event" page after logging in.
2. Fill out the event form with required details such as event name, speaker, time, date, address, etc.
3. Submit the form to create a new event.

### Event Management

1. View all events you've created under the "Dashboard" section.
2. Manage (update or delete) events by clicking the **Manage** button for each event.

### Profile Management

1. Update your user profile by navigating to the "Profile" page.
2. Modify your information like name, email, phone number, profile picture, and more.

## API Endpoints

### Authentication

- **POST** `/api/auth/signup`: Sign up a new user.
- **POST** `/api/auth/signin`: Log in an existing user.

### Events

- **POST** `/api/events`: Create a new event.
- **GET** `/api/events`: Get all events.
- **GET** `/api/events/[id]`: Get a specific event by ID.
- **PATCH** `/api/events/[id]`: Update a specific event.
- **DELETE** `/api/events/[id]`: Delete a specific event.

### User Profile

- **GET** `/api/user/[user]`: Get user profile data.
- **PATCH** `/api/user/[user]`: Update user profile data.

## Database Schema

### User Schema

```json
{
  "username": "String",
  "firstName": "String",
  "lastName": "String",
  "email": "String",
  "phoneNumber": "String",
  "DOB": "Date",
  "profilepic": "String",
  "coverpic": "String"
}
```
### Event Schema

```json
{
  "eventfield": "String",
  "topic": "String",
  "email": "String",
  "Date": "Date",
  "Time": "String",
  "TicketPrice": "String",
  "speaker": "String",
  "address": "String",
  "Eventpic": "String",
  "done": "Boolean"
}
```
### License

This project is licensed under the MIT License - see the LICENSE file for details.


* https://github.com/TiwariRahul16/Event_Management_System

