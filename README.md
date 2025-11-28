#  EventLite – Ticket Booking Platform (Client)

**EventLite** is a full-stack event management and ticket booking platform.
This repository contains the **frontend (client)** built with **React**, **TypeScript**, and **Tailwind CSS**, offering a fast, secure, and real-time interface for users, organizers, and administrators.

---

##  Overview

The frontend serves as the user interface for EventLite, providing a modern, responsive experience for discovering events, booking tickets, and managing profiles.
It integrates with the backend through REST APIs and WebSockets for real-time updates.

**Core Highlights**

* Modular and scalable codebase.
* Real-time event updates using WebSockets.
* Secure authentication via Google OAuth 2.0 and JWT.
* Optimized UI/UX with shadcn/ui and Tailwind CSS.

---

##  Architecture

| Layer                 | Description                                                                            |
| --------------------- | -------------------------------------------------------------------------------------- |
| **Frontend Layer**    | React SPA with modular architecture and state management using Redux Toolkit & Zustand |
| **API Layer**         | Connects with Express.js REST API and WebSockets for real-time communication           |
| **Data Layer**        | Fetches and manages data from the backend using Axios interceptors                     |
| **Cache Layer**       | Utilizes browser storage and Redis (via backend) for performance                       |
| **External Services** | Stripe (payments), Cloudinary (media), Google OAuth (auth)                             |

---

## 📁 Folder Structure

```
src/
├── app/                          # Redux store & configuration
│   ├── store/
│   │   └── index.js
│   └── rootReducer.js
│
├── components/                   # Reusable UI components
│   ├── ui/                       # shadcn/ui components
│   ├── common/                   # Header, Footer, Loader, ErrorBoundary
│   └── forms/                    # Custom forms, search bar, uploads
│
├── modules/                      # Feature-based modular structure
│   ├── auth/                     # Authentication (Google OAuth, JWT)
│   ├── events/                   # Event listing, creation, details
│   ├── tickets/                  # Ticket booking & QR validation
│   ├── payments/                 # Stripe integration & payments
│   └── user/                     # Profile & booking history
│
├── pages/                        # Page-level components (Home, Dashboard, Booking)
│
├── hooks/                        # Global reusable hooks
│
├── services/                     # API layer (Axios + WebSocket)
│
├── utils/                        # Helper functions & validators
│
├── styles/                       # Global and component-level CSS
│
└── assets/                       # Images, icons, fonts
```

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/PraveenBaghelMaurya/EventLite-Client.git
cd EventLite-Client
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root:

```env
VITE_API_URL=http://localhost:8880
VITE_SOCKET_URL=http://localhost:8880
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

### 4. Run the Application

```bash
npm run dev
```

Access the app at: **[http://localhost:5173](http://localhost:5173)**

---

##  Modules Overview

###  Authentication Module

* Google OAuth 2.0 integration
* JWT token management
* Role-based access (User / Organizer / Admin)
* Persistent login with refresh tokens

###  User Management Module

* Profile creation & updates
* Avatar upload via Cloudinary
* Booking history view
* Preference settings

###  Events Module

* Event creation and editing
* Category-based filtering and search
* Paginated listings with image uploads
* Organizer event analytics

###  Ticket Management Module

* Ticket booking and validation
* QR code generation
* Real-time availability tracking
* Capacity control

###  Payments Module

* Stripe integration for secure checkout
* Webhook support for transaction updates
* Refund and payment status tracking

###  Real-Time Notifications

* WebSocket for live updates
* Instant notifications and status alerts
* Real-time viewer count and availability

---

##  Tools & Technologies

| Category              | Technology                                          |
| --------------------- | --------------------------------------------------- |
| **Frontend**          | React, TypeScript, Tailwind CSS, shadcn/ui, Zustand |
| **State Management**  | Redux Toolkit, Redux Persist                        |
| **Validation**        | Zod, React Hook Form                                |
| **Real-Time**         | Socket.io Client                                    |
| **Payments**          | Stripe                                              |
| **Media**             | Cloudinary                                          |
| **Authentication**    | Google OAuth 2.0, JWT                               |
| **DevOps**            | Docker, Jenkins, Vercel                             |
| **Logging/Debugging** | Morgan, Winston, ESLint, Prettier                   |

---

##  State Management

* **Redux Toolkit** for app-wide states (auth, events, tickets).
* **Zustand** for lightweight UI and filter states.
* **LocalStorage** for session persistence.

---

##  Security

* OAuth 2.0 & JWT Authentication
* Role-based route protection
* CSRF/XSS protection
* Input validation with Zod
* PCI-compliant payment handling via Stripe

---

##  Performance Optimization

* Redis caching (via backend)
* Code-splitting and lazy loading
* Optimized queries and pagination
* Image optimization via Cloudinary CDN
* WebSocket for real-time synchronization

---

##  API Endpoints (Used by Client)

| Module   | Endpoint                      | Description                 |
| -------- | ----------------------------- | --------------------------- |
| Auth     | `/api/auth/google`            | OAuth authentication        |
| Auth     | `/api/auth/refresh`           | Refresh JWT                 |
| Users    | `/api/users/profile`          | Get/Update profile          |
| Events   | `/api/events`                 | List or create events       |
| Tickets  | `/api/tickets`                | Ticket booking & validation |
| Payments | `/api/payments/create-intent` | Stripe payment creation     |

---

##  Deployment

### Using Vercel:

```bash
npm run build
vercel deploy
```

Or deploy the built `dist/` folder manually to your hosting provider.

---

##  Developer Tools

* **React DevTools** – Inspect component hierarchy
* **Redux DevTools** – Track state changes
* **Prisma Studio** – Database management (via backend)
* **Swagger UI** – API documentation (backend)

---

##  Author

**Praveen Kumar**
📍 New Delhi
📧 [praveenbaghelmaurya@gmail.com](mailto:praveenbaghelmaurya@gmail.com)
🔗 [LinkedIn](https://www.linkedin.com/in/praveen-kumar-847808208/)
💻 [GitHub](https://github.com/PraveenBaghelMaurya)
