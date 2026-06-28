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
| Ross Crawford | Product Owner | Full-Stack Developer |
| Jove Tondo | Scrum Master | Full-stack Developer |
---

## Team Contributions
 
| Name | Role | Contributions |
|---|---|---|
| Jove Tondo | Scrum Master / Full-stack Developer | Flask Blueprint architecture, SQLAlchemy models, auth routes, cart, orders, caregiver, account, onboarding endpoints, CSS Modules migration, Jira sprint management |
| Ross Crawford | Product Owner / Full-Stack Developer | Next.js App Router setup, global styles, header/navbar, ProductCard component, Wishlist, Add to cart, Browse/Products page, Accessibility toggle implementation, UI design system, Figma wireframes, Unit Testing |
 
---

## Technology Stack

| Layer | Technology | Why We Chose It |
|---|---|---|
| Frontend | React with Next.js (App Router, TypeScript) | Component-based architecture; Enables server-side rendering and clean page organisation |
| Backend | Python Flask with SQLAlchemy Blueprints | Lightweight. Blueprints keep route files modular and maintainable |
| Database | PostgreSQL via Neon DB (AWS Sydney) | Reliable relational DB; Neon provides a hosted cloud instance with minimal setup |
| Real-time | Flask-SocketIO | Deferred as stretch goal |
| Styling | CSS Modules with rem-based sizing | Scoped styles per component; rem units allow the accessibility toggle to scale the full UI |
| Design | Figma | Collaborative wireframing and UI system design |
| Project Management | Jira | Sprint planning, backlog, and task tracking |
| Version Control | GitHub | Feature branching, pull requests, and code review |
---

## Project Structure

```
ELDR/
├── backend/
│   ├── app/
│   │   ├── routes/                 # Flask Blueprint route handlers
│   │   │   ├── auth.py             # Register, login, logout
│   │   │   ├── products.py         # Product listing and detail
│   │   │   ├── cart.py             # Cart CRUD operations
│   │   │   ├── orders.py           # Checkout and order history
│   │   │   ├── wishlist.py         # Wishlist management
│   │   │   ├── caregiver.py        # Caregiver link requests
│   │   │   └── account.py          # User profile
│   │   ├── db.py                   # SQLAlchemy SessionLocal and engine
│   │   └── models.py               # ORM models (User, Product, Order, etc.)
│   ├── migrations/                 # Database migration scripts
│   ├── tests/                      # Backend unit tests
│   ├── venv/                       # Python virtual environment (not committed)
│   ├── .env                        # Environment variables (not committed)
│   ├── requirements.txt            # Python dependencies
│   └── app.py                      # Flask entry point and Blueprint registration
│
├── frontend/
│   ├── public/                     # Static assets (favicon, images)
│   └── src/
│       ├── app/                    # Next.js App Router pages
│       │   ├── account/            # Account settings page
│       │   ├── caregiver/          # Caregiver linking page
│       │   ├── cart/               # Shopping cart page
│       │   ├── checkout/           # Checkout page
│       │   ├── dashboard/          # Home/dashboard page
│       │   ├── forgot-password/    # Password reset page
│       │   ├── login/              # Login page
│       │   ├── onboarding/         # Guided onboarding for elderly users
│       │   ├── order-confirmation/ # Post-checkout confirmation
│       │   ├── orders/             # Order history page
│       │   ├── product/            # Product detail page
│       │   ├── register/           # Registration page
│       │   ├── wishlist/           # Wishlist page
│       │   ├── globals.css         # Global base styles
│       │   ├── layout.tsx          # Root layout with AccessibilityContext
│       │   └── page.tsx            # Root redirect
│       ├── components/             # Reusable UI components
│       │   └── ui/
│       │       ├── AuthCard.tsx
│       │       ├── Button.tsx
│       │       ├── InputField.tsx
│       │       └── ProductCard.tsx
│       ├── context/                # React context providers
│       │   └── AccessibilityContext.tsx
│       ├── data/                   # Static/seed data
│       ├── lib/                    # Shared utilities and helpers
│       ├── _tests_/                # Frontend unit tests
│       ├── .env.local              # Frontend environment variables (not committed)
│       └── next.config.ts          # Next.js configuration
│
├── docs/
│   ├── BranchingStrategy.md
│   ├── PullRequestGuide.md
│   └── schema.md                   # Database schema reference
│
└── README.md
```
---

## Getting Started

### Prerequisites
- Node.js v18+
- Python 3.11+
- PostgreSQL with Neon DB
- pip
- A Neon PostgreSQL database (or local PostgreSQL instance)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/Owshuhnee/ELDR.git
cd ELDR
```
**2. Set up the backend**
```bash
cd backend
 
# Activate the virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate
 
# Install Python dependencies
pip install -r requirements.txt
 
# Configure environment variables
# Create a .env file in /backend with the following:
# DATABASE_URL=your_neon_postgresql_connection_string
# SECRET_KEY=your_flask_secret_key
 
# Start the Flask server
python app.py
# Runs on http://localhost:5000
```

**3. Set up the frontend (new terminal)**
```bash
cd frontend
 
# Install Node dependencies
npm install
 
# Configure environment variables
# Create a .env.local file in /frontend with:
# NEXT_PUBLIC_API_URL=http://localhost:5000
 
# Start the Next.js development server
npm run dev
# Opens http://localhost:3000
```
---

## How to Use
 
1. Navigate to `http://localhost:3000`
2. **Register** a new account (select Elder or Caregiver role)
3. Elders complete **Guided Onboarding** to personalise their experience
4. **Browse** products and filter by need category
5. Add items to **Cart** and proceed through **Checkout**
6. View **Order History** and **Wishlist** from the Account menu
7. Use the **Accessibility toggle** (top right) to enable large text and high contrast mode
8. Caregivers can send a **link request** to an elder via the Caregiver page
---

## Key Implementation Details
 
- **Accessibility toggle** is implemented via `AccessibilityContext.tsx` and applies a `.a11y-on` class to `<html>`, which increases `font-size` from `18px` to `22px`. All sizing uses `rem` units so the entire UI scales proportionally.
- **Session-based auth** uses Flask sessions with `credentials: 'include'` on all frontend fetch calls to ensure cookies are sent cross-origin.
- **SQLAlchemy session hygiene** — all database route handlers use a `finally: db.close()` pattern to prevent connection pool exhaustion against Neon's hosted PostgreSQL.
- **Blueprint URL prefixing** — route decorators use relative paths (e.g. `/login`) and the prefix (e.g. `/api/auth`) is set at Blueprint registration in `app.py` to avoid double-prefixing.
- **CSS Modules** are used across all pages for scoped styling and to support media queries (which inline styles cannot handle).
---

## Testing
 
Manual testing steps:
1. Register as an Elder → complete onboarding → verify session persists on login
2. Browse products → apply category filters → open product detail
3. Add to cart → adjust quantity → proceed to checkout → verify order confirmation
4. Check Order History — confirm new order appears
5. Add product to Wishlist → verify it persists across page refreshes
6. Register a second account as Caregiver → send link request → accept from Elder account
7. Toggle Accessibility Mode → confirm text and layout scale correctly on all pages
8. Test on Chrome and Firefox; test on mobile viewport (375px width)
---

## Known Limitations
 
- Flask-SocketIO real-time notifications are scaffolded but not active in this prototype (deferred as a stretch goal)
- Payment processing uses a simulated flow — no real payment gateway is integrated
---

## Future Enhancements
 
- Real-time notifications via Flask-SocketIO when a caregiver places an order on behalf of an elder
- Caregiver shopping-on-behalf-of-elder flow with `recipient_id` on orders
- Leave a Review feature (EP-56) — allow elderly users to rate purchased products
- Full text search with need-based ranking
---

## References
 
- Next.js App Router Documentation: https://nextjs.org/docs/app
- Flask Documentation: https://flask.palletsprojects.com/
- SQLAlchemy Documentation: https://docs.sqlalchemy.org/
- Neon PostgreSQL: https://neon.tech/docs
- bcrypt for Python: https://pypi.org/project/bcrypt/
---

## Documentation

- [Branching Strategy](docs/BranchingStrategy.md)
- [Pull Request Guidelines](docs/PullRequestGuide.md)
- [Database Schema](docs/schema.md)
---

## Course Information
 
**Programme:** Diploma in Software Development — Yoobee Colleges (NMIT)
 
**CS202** Cross-Platform Development — Project Proposal ✅ Complete  
**CS203** Investigative Studio I — Project Implementation ✅ Complete
 
---

## License
 
This project is for educational purposes as part of the Diploma in Software Development at Yoobee Colleges.