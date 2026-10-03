# WanderLust-Major-Project

> A full-stack web application that allows users to discover, create, and review travel properties with secure authentication, image uploads, and responsive UI.

🔗 **Live Demo:** https://wanderlust-z6i8.onrender.com/listings

---

## 📌 About The Project

**WanderLust** is a full-stack travel and property listing platform inspired by Airbnb.

The application allows users to explore different properties, view property details, check locations on an interactive map, create their own listings, upload property images, and share reviews.

The project follows a structured **MVC architecture** with separate models, controllers, routes, views, middleware, and utility modules.

The main goal of this project was to understand how a real-world full-stack web application works — from frontend rendering and user authentication to database operations, image storage, authorization, and deployment.

---

## ✨ Key Features

### 🔐 User Authentication & Authorization

* User registration and login
* Secure authentication using **Passport.js**
* Session-based authentication
* Protected routes
* Authorization based on resource ownership
* Flash messages for user feedback

### 🏠 Property Listing Management

* Browse available properties
* View detailed property information
* Create new property listings
* Edit existing listings
* Delete listings
* Property ownership validation

### ⭐ Review & Rating System

* Add reviews to properties
* Star-based ratings
* Delete reviews
* Review ownership validation
* Display reviews with property details

### 📸 Image Upload & Storage

* Upload property images
* Cloud-based image storage using **Cloudinary**
* Display uploaded images dynamically

### 📱 Responsive User Interface

* Responsive design for different screen sizes
* Bootstrap-based UI components
* Dynamic EJS templates
* User-friendly navigation and forms

### ⚠️ Validation & Error Handling

* Server-side validation
* Client-side form validation
* Custom error handling
* Flash notifications for successful and failed operations

---

## 🛠️ Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* Bootstrap
* EJS

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* Passport.js
* Express Session
* Connect-Mongo

### Cloud & APIs

* Cloudinary — Image Storage
* Mapbox — Interactive Maps

### Development Tools

* Git
* GitHub
* VS Code
* Render

---

## 🏗️ Project Architecture

The project follows the **MVC (Model-View-Controller)** architecture.

```text
WanderLust
│
├── controllers/        # Application business logic
├── models/             # MongoDB/Mongoose schemas
├── routes/              # Application routes
├── views/               # EJS templates
├── public/              # CSS, JavaScript & static files
├── utils/               # Utility functions
├── init/                # Database initialization
│
├── app.js               # Main application entry point
├── middleware.js        # Authentication & authorization middleware
├── cloudConfig.js       # Cloudinary configuration
├── schema.js            # Validation schemas
├── package.json         # Dependencies & scripts
└── README.md
```

---

## 🔄 Application Workflow

```text
User
  ↓
Frontend (EJS + Bootstrap)
  ↓
Express.js Routes
  ↓
Middleware
  ↓
Controllers
  ↓
Mongoose
  ↓
MongoDB
```

For image uploads:

```text
User
  ↓
Upload Image
  ↓
Multer
  ↓
Cloudinary
  ↓
Image URL
  ↓
MongoDB
```

For location:

```text
Property Location
       ↓
     Mapbox
       ↓
Interactive Map
```

---

## 🔑 Important Technical Concepts Used

This project helped implement several concepts commonly used in backend development:

* RESTful routing
* CRUD operations
* MVC architecture
* Authentication
* Authorization
* Session management
* Middleware
* Schema validation
* Database relationships
* Error handling
* Cloud storage integration
* Third-party API integration
* Server-side rendering
* Environment variables
* Deployment

---

## 🚀 Getting Started

### Prerequisites






## 📸 Screenshots

Add screenshots of the following pages here:

### Home Page

![Home Page](./screenshots/home.png)

### Listings Page

![Listings](./screenshots/listings.png)

### Property Details

![Property Details](./screenshots/details.png)

### Login / Signup

![Authentication](./screenshots/login.png)



## 🎯 What I Learned

Through this project, I gained practical experience in:

* Building a complete full-stack web application
* Designing RESTful routes
* Working with MongoDB and Mongoose
* Implementing authentication and authorization
* Structuring applications using MVC architecture
* Integrating third-party services such as Cloudinary and Mapbox
* Handling CRUD operations
* Managing sessions and protected routes
* Implementing validation and error handling
* Deploying a Node.js application

---

## 🔮 Future Improvements

Some features that can be added in future versions:

* Property booking system
* Payment gateway integration
* Wishlist functionality
* Advanced property search and filtering
* Email notifications
* User profile dashboard
* Admin dashboard
* Property availability management

