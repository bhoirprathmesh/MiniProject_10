# 🌍 E-Waste Facility Locator

A full-stack MERN web application that helps users locate nearby certified e-waste disposal and recycling centers using interactive maps, educational tools, and smart prediction features.

---

## 🚀 Project Overview

The **E-Waste Facility Locator** is a user-friendly and responsive platform that enables users to:
- Locate authorized e-waste recycling centers on a map
- Filter facilities based on services and distance
- Predict the recycle price of smartphones
- Shop for refurbished/recycled parts
- Access awareness and educational resources

The platform is built using the **MERN Stack**, **Google Maps API**, and **EmailJS** for contact and query services.

---

## 🧩 Features

✅ Locate Nearby E-Waste Facilities via Google Maps  
📍 Filter Facilities by Distance, Services, and Timings  
📲 Recycle Price Prediction for Smartphones (ML Model)  
🛒 Store Section to Resell/Rebuy Recycled Parts  
📚 Awareness Section for E-Waste Education  
📧 Contact & Feedback via EmailJS (No Server Required)  
🔐 Secure Authentication System  
📊 Admin Dashboard for Managing Users & Facilities

---

## 🛠 Tech Stack

**Frontend:**  
- React + Vite  
- Bootstrap 5  
- Google Maps JavaScript API  
- EmailJS (for contact form)

**Backend:**  
- Node.js  
- Express.js
- Python (Flask)

**Database:**  
- MongoDB Atlas (Mongoose ODM)  

**Machine Learning Integration:**  
- Price Prediction Model (for recycling smartphones)

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/bhoirprathmesh/MiniProject_10.git
cd MiniProject_10
```

### 2. Install Frontend Dependencies
```bash
cd 10ewfl
npm install
```

### 3. Install Backend Dependencies
```bash
cd ../server
npm install
```

### 4. Set Up Environment Variables
Create a .env file in the /server directory and add:
```ini
MONGO_URI=your_mongodb_connection_string
EMAILJS_USER_ID=your_emailjs_user_id
GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### 5. Start the Development Server
Frontend:
```bash
cd 10ewfl
npm run dev
```

Backend:
```bash
cd ../server
npm run dev
```

### 6. View the Application
Open your browser at:
http://localhost:5173
