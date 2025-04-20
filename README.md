# 🌱 EcoCheck – Carbon Footprint Tracker

EcoCheck is a full-stack web application that allows users to monitor and reduce their carbon footprint by submitting daily or monthly routine inputs. It predicts the user's carbon footprint using machine learning, provides real-time feedback, and even integrates an AI-powered chatbot offering personalized green lifestyle tips.

---

## 📌 Features

- 🔍 *Carbon Footprint Prediction* using a trained XGBoost ML model
- 🧾 *Form-based UI* for daily/monthly user inputs (transportation, energy usage, diet, etc.)
- 📊 *Real-time Feedback* based on user data
- 🤖 *AI Chatbot* (powered by LangChain + Ollama) for eco-friendly lifestyle suggestions
- 💾 *User Authentication* and personalized data storage
- 🔁 *Dynamic UI Updates* with error handling
- 🌐 *RESTful API* using FastAPI for communication between frontend and backend

---

## 🧰 Tech Stack

### 🖥️ Frontend
- **React.js** – UI library for building interactive user interfaces  
- **Tailwind CSS** – Utility-first CSS framework for styling
- **JavaScript DOM Manipulation** – For real-time interactivity
- **Recharts** – Charting library for data visualizations  
- **Lucide-react** – Icon library for clean, customizable icons  
- **Axios** – HTTP client for API requests  
- **React Router** – Client-side routing for navigation  

### 🛠️ Backend
- **Node.js** – JavaScript runtime environment  
- **Express.js** – Web framework for building APIs  
- **MongoDB** – NoSQL database for storing user and form data  
- **Mongoose** – ODM for interacting with MongoDB  
- **bcrypt** – Password hashing for secure authentication  
- **jsonwebtoken** – Handling and verifying JWT tokens  
- **FastAPI** – Python backend service for ML-based carbon footprint estimation  
- **XGBoost** – Machine Learning model for carbon footprint prediction  
- **Python (pydantic, scikit-learn, pandas)** – For data processing and model integration  
- *LangChain + Ollama* – Natural Language AI chatbot integration

---

## ⚙ How It Works

1. *User signs up/logs in* to the platform.
2. They fill out a *form* about their daily or monthly activities (e.g., transport, energy, food).
3. Submitted data is *validated and preprocessed*.
4. The backend sends it to the *XGBoost model*, which returns a carbon footprint estimate.
5. The user receives *real-time feedback* with tips to reduce their footprint.
6. They can also interact with a *chatbot* for personalized eco-advice.

---

## 🔮 Future Enhancements
-  Mobile App Integration
-  Carbon Tracker Map for regional comparison
-  Carbon History Timeline to visualize progress
-  Fine-tuned Chatbot with more personalized responses

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository and Install Dependencies
```bash
git clone <your-repo-url>
cd Hack4Bengal

# Install frontend dependencies
npm install
npm run dev

# Install backend dependencies and start the server
cd server
npm install
nodemon server.js

# Install Python API dependencies and start the model
cd python-api
python main.py

