# ELDR – Elderly-Friendly Marketplace Platform

> A dedicated, accessible online marketplace designed for elderly users and their caregivers in New Zealand.

---

## 📌 Project Overview

ELDR addresses a clear gap in digital commerce for older adults. Mainstream platforms like Trade Me are not designed with elderly users in mind — cluttered interfaces, no product verification, and overwhelming search results create barriers to independent online shopping.

ELDR solves this by providing:
- A **curated marketplace** of verified elderly-friendly products
- An **accessibility-first interface** (large text, high contrast, simplified navigation)
- **Family/caregiver account sharing** for assisted purchasing
- **Need-based filtering** by category (mobility, vision, hearing, daily living)
- **Elderly-specific reviews** from users with similar accessibility needs

---

## 👥 Team

| Name | Primary Role | Secondary Role |
|---|---|---|
| Ross Crawford | Scrum Master | Frontend/Backend Developer |
| Jove Tondo | Product Owner | Frontend/Backend Developer |

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React with Next.js |
| Backend | Python Flask |
| Database | PostgreSQL |
| Real-time | Flask-SocketIO (Pending) |
| Design | Figma |
| Project Management | JIRA |
| Version Control | GitHub |

---

## 🗂️ Project Structure

```
eldr/
├── frontend/          # Next.js React application
│   ├── components/    # Reusable UI components
│   ├── pages/         # Next.js page routes
│   └── styles/        # Global styles and design tokens
├── backend/           # Python Flask application
│   ├── routes/        # Flask API route handlers
│   ├── models/        # Database models
│   └── middleware/    # Auth and validation middleware
├── database/          # PostgreSQL schema and migrations
└── docs/              # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- Python 3.11+
- PostgreSQL
- pip

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/eldr.git
cd eldr

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run database migrations
npm run db:migrate

# Start development server
npm run dev
```

---

## 📋 Key Features

- **Verified Product Badge** – All products meet elderly-friendly standards before listing
- **Search by Need** – Filter by mobility, vision, hearing, and daily living
- **Accessibility Mode** – High contrast, large text, and simplified navigation
- **Family Account Access** – Caregivers can assist elderly users
- **Elderly User Reviews** – Feedback from users with similar needs
- **Wishlist & Recurring Purchases** – Save and reorder frequently used products

---


## 📚 Course Information

**Programme:** Diploma in Software Development

**Course:** SD202 Cross-Platform Development - Project Proposal
- **Submitted:** April 2026

**Course:** SD203 Investigative Studio I - Project Implementation
- **Submitted:** June 2026 (In progress)

---

## 📄 License

This project is for educational purposes as part of the Diploma in Software Development at Yoobee Colleges.