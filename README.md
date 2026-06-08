# ELDR – Elderly-Friendly Marketplace Platform

> A dedicated, accessible online marketplace designed for elderly users and their caregivers in New Zealand.

---

## Project Overview

ELDR addresses a clear gap in digital commerce for older adults. Mainstream platforms like Trade Me are not designed with elderly users in mind — cluttered interfaces, no product verification, and overwhelming search results create barriers to independent online shopping.

ELDR solves this by providing:
- A **curated marketplace** of verified elderly-friendly products
- An **accessibility-first interface** (large text, high contrast, simplified navigation)
- **Family/caregiver account sharing** for assisted purchasing
- **Need-based filtering** by category (mobility, vision, hearing, daily living)
- **Elderly-specific reviews** from users with similar accessibility needs

---

## Key Features

- **Verified Product Badge** – All products meet elderly-friendly standards before listing
- **Search by Need** – Filter by mobility, vision, hearing, and daily living
- **Accessibility Mode** – High contrast, large text, and simplified navigation
- **Family Account Access** – Caregivers can assist elderly users
- **Elderly User Reviews** – Feedback from users with similar needs
- **Wishlist & Recurring Purchases** – Save and reorder frequently used products

---

## Team

| Name | Primary Role | Secondary Role |
|---|---|---|
| Ross Crawford | Scrum Master | Full-Stack Developer |
| Jove Tondo | Product Owner | Full-stack Developer |

---

## Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React with Next.js |
| Backend | Python Flask |
| Database | PostgreSQL with Neon DB |
| Real-time | Flask-SocketIO (Pending) |
| Design | Figma |
| Project Management | JIRA |
| Version Control | GitHub |

---

## Project Structure

```
ELDR/
├── frontend/                  # Next.js React application
│   ├── public/                # Static assets
│   └── src/
│       ├── app/                 # Next.js App Router pages
│       │   ├── dashboard/       # Dashboard page
│       │   ├── login/           # Login page
│       │   ├── register/        # Register page
│       │   ├── forgot-password/ # Forgot password page
│       │   └── product/         # Product detail page
│       ├── components/ui/       # Reusable UI components
│       │   ├── AuthCard.tsx
│       │   ├── Button.tsx
│       │   ├── InputField.tsx
│       │   └── ProductCard.tsx
│       └── data/                # Static data
│           └── products.ts
├── backend/                     # Python Flask application
│   ├── app/                     # Flask app package
│   │   ├── routes/              # API route handlers
│   │   │   └── auth.py          # Auth routes
│   │   ├── db.py                # Database connection
│   │   └── models.py            # Database models
│   ├── migrations/              # Database migrations
│   ├── tests/                   # Backend tests
│   └── app.py                   # Flask entry point
├── docs/                        # Project documentation
│   └── schema.md                # Database schema
└── .github/                     # GitHub templates

```

---

## Getting Started

### Prerequisites
- Node.js v18+
- Python 3.11+
- PostgreSQL with Neon DB
- pip

### Installation

```
# Clone the repository
git clone https://github.com/Owshuhnee/ELDR.git
cd ELDR

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Install and run frontend
cd frontend
npm install
npm run dev

# In a separate terminal — run backend
cd backend
venv\Scripts\activate
python app.py
```

---

## Documentation

- [Branching Strategy](docs/BranchingStrategy.md)
- [Pull Request Guidelines](docs/PullRequestGuide.md)
- [Database Schema](docs/schema.md)

---

## Course Information

**Programme:** Diploma in Software Development  
**Institution:** Yoobee Colleges  

**SD202** Cross-Platform Development — Project Proposal ✅  Complete
**SD203** Investigative Studio I — Project Implementation 🟡 In Progress

---

## License

This project is for educational purposes as part of the Diploma in Software Development at Yoobee Colleges.