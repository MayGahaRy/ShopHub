# ShopHub - Premium Online Store

[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/MayGahaRy/ShopHub)

A cinematic, full-featured e-commerce application built with React (Vite) and Node.js (Express). Features a robust theme system, dark mode, smooth animations, and a professional glass-morphism aesthetic.

## 🚀 Quick Start with Docker

The easiest way to get ShopHub running is using Docker.

### Prerequisites
- Docker and Docker Compose installed on your machine.

### One-Command Setup
From the root directory, simply run:

```bash
docker-compose up --build
```

- **Frontend**: Accessible at `http://localhost`
- **Backend API**: Accessible at `http://localhost:5000/api`

## 🛠️ Manual Development Setup

If you prefer to run the services manually:

### 1. Backend Server
```bash
cd server
npm install
npm start
```

### 2. Frontend Application
```bash
# In the root directory
npm install
npm run dev
```

## ✨ Key Features
- **Dark/Light Mode**: Full theme support across the entire app.
- **Cinematic UI**: Smooth transitions and premium animations.
- **Admin Dashboard**: Comprehensive order and product management.
- **Live Chat**: Real-time support widget for customers.
- **Responsive Navigation**: Tailored mobile and desktop experiences.

## 📦 Project Structure
- `/src`: Frontend React application.
- `/server`: Backend Express server with SQLite/Sequelize.
- `docker-compose.yml`: Orchestration for the entire stack.
