# Eventshub - Event Booking System

Eventshub is a modern event booking system built using **Vite React** for fast, responsive front-end development, and **Firebase** for backend services. Users can browse events, book tickets, and enjoy seamless integration with Firebase for authentication, storage, and real-time updates.

## Features

### User Features:
- **Browse Events:** Explore upcoming events with detailed descriptions, dates, and venue information.
- **Book Tickets:** Select tickets and proceed with secure bookings.
- **User Authentication:** Sign up and log in with Google or Email via Firebase Authentication.
- **Real-Time Updates:** Get real-time notifications about event updates, booking status, and more.
- **View Booking History:** Track your past bookings and event details.
- **Payment Integration:** Integrated with Firebase for payment processing and ticket generation.

### Admin Features:
- **Manage Events:** Admins can add, edit, and delete events.
- **View Bookings:** Admins can view all ticket bookings, including user details.
- **Generate Reports:** Admins can generate and download booking reports.
- **Manage Users:** View and manage user data and booking activity.

## Technologies Used
- **Frontend:** React, Vite
- **Backend:** Firebase (Authentication, Firestore, Storage)
- **Payment:** Firebase Functions (optional for integration)
- **Hosting:** Firebase Hosting
- **UI/UX:** Material-UI or your preferred library

## Installation

### Prerequisites:
- Node.js (>= 14)
- Firebase account

### Steps:
1. Clone the repository:
   ```bash
   git clone https://github.com/amber305/eventshub.git
   cd eventshub
2. Install dependencies:
    ```bash
   npm install
3. Set up Firebase:
   -> Create a Firebase project in the Firebase console.
   -> Add your Firebase config to the firebase-config.js file in your project.
4. Run the app:
   ```bash
   npm run dev
   This will start the Vite development server and you can access the app at http://localhost:3000.

###Firebase Configuration:  Ensure you have the following Firebase services set up:

####Authentication: Enable Google and Email sign-in methods.
####Firestore Database: Create a Firestore database to store event details and bookings.
####Firebase Hosting: Set up for easy deployment.




