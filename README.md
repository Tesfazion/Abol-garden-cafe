# Abole Garden Café — Full-Stack Web Application

**Modern café website with professional admin dashboard**

A complete full-stack café web application built with **Next.js 14** (frontend) and **Express + MongoDB** (backend), featuring a professional restaurant design, authentic Ethiopian cuisine menu, and comprehensive admin management system.

---

## 🎯 Latest Updates (July 5, 2026)

### ✅ Professional Admin Dashboard
- Complete redesign with sidebar navigation
- Clean white cards on gray background
- Mobile responsive with hamburger menu
- Stats overview, quick actions, recent activity
- **See:** `ADMIN_DASHBOARD_CHANGES.md`

### ✅ Real Menu Images Integration
- 27 authentic menu items with real café photos
- Organized into 4 categories
- Coffee & Tea (7), Beverages (2), Main Dishes (9), Bakes & Desserts (5)
- Ethiopian Birr (ETB) pricing
- **See:** `MENU_IMAGES_INTEGRATION.md`

**Full details:** `COMPLETED_TASKS_SUMMARY.md`

---

## What You Need Installed First

| Tool | Why | Download |
|------|-----|----------|
| **Node.js 18+** | Runs both servers | https://nodejs.org |
| **MongoDB Community** | The database | https://www.mongodb.com/try/download/community |

> **Windows tip:** After installing MongoDB, create the default data folder:
> ```powershell
> New-Item -ItemType Directory -Force -Path C:\data\db
> ```

---

## Step-by-Step: Running the Project

### 1. Start MongoDB (REQUIRED — do this first)
Open a terminal and run:
```powershell
mongod --dbpath C:\data\db
```
Keep this terminal open. MongoDB must stay running.

### 2. Start Everything Else
Open a second terminal at the project root and run:
```powershell
.\start-all.ps1
```

This script will automatically:
- Verify MongoDB is reachable on port 27017
- Install backend dependencies (first run only)
- Seed the database with menu items and an admin account
- Start the Express backend on port **8869**
- Install frontend dependencies (first run only)
- Start the Next.js frontend on port **1995**

---

## Your URLs

| Service | URL |
|---------|-----|
| **Website (frontend)** | http://localhost:1995 |
| **API (backend)** | http://localhost:8869 |
| **API Health Check** | http://localhost:8869/health |
| **Database** | mongodb://localhost:27017/cafe |

---

## Frontend Pages

| Page | URL | What it does |
|------|-----|-------------|
| **Home** | http://localhost:1995/ | Video hero, featured menu, garden experience |
| **Menu** | http://localhost:1995/menu | Browse 27 real menu items with photos |
| **About** | http://localhost:1995/about | Brand story, garden experience, values |
| **Gallery** | http://localhost:1995/gallery | Photo gallery with category filters |
| **Contact** | http://localhost:1995/contact | Contact form, map, FAQ |
| **Booking** | http://localhost:1995/booking | Reserve a table |
| **Login** | http://localhost:1995/auth/login | User authentication |
| **Register** | http://localhost:1995/auth/register | Create account |
| **Account** | http://localhost:1995/account | Customer dashboard |
| **Admin** | http://localhost:1995/admin | Professional admin dashboard |

---

## Backend API Endpoints

All routes are at `http://localhost:8869/api/...`

### Public (no login needed)
| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/menu | List all available menu items |
| GET | /api/menu?category=COFFEE | Filter by COFFEE / BAKES / PLATES |
| GET | /api/menu/:id | Single menu item |
| POST | /api/auth/register | Create customer account |
| POST | /api/auth/login | Log in, get JWT token |
| POST | /api/orders | Place a guest order |
| POST | /api/bookings | Make a guest booking |

### Authenticated (include Authorization: Bearer <token>)
| Method | URL | Description |
|--------|-----|-------------|
| GET | /api/orders/mine | Your orders |
| GET | /api/bookings/mine | Your bookings |
| DELETE | /api/bookings/:id | Cancel your booking |

### Staff / Admin only
| Method | URL | Description |
|--------|-----|-------------|
| POST | /api/menu | Add menu item |
| PATCH | /api/menu/:id | Update menu item |
| DELETE | /api/menu/:id | Soft-delete menu item |
| GET | /api/orders | All orders |
| PATCH | /api/orders/:id/status | Advance order status |
| GET | /api/bookings | All bookings |
| PATCH | /api/bookings/:id/status | Update booking status |
| GET | /api/admin/summary | Dashboard stats |

---

## Test the API (curl examples)

### Login as admin
```powershell
curl -X POST http://localhost:8869/api/auth/login `
  -H "Content-Type: application/json" `
  -d "{""email"":""admin@kilncoffeehouse.example"",""password"":""adminpass123""}"
```
Copy the `token` from the response.

### Get menu
```powershell
curl http://localhost:8869/api/menu
```

### Place a guest order
```powershell
curl -X POST http://localhost:8869/api/orders `
  -H "Content-Type: application/json" `
  -d "{""guestName"":""Jane"",""guestEmail"":""jane@example.com"",""deliveryAddress"":""12 Foundry Lane"",""lines"":[{""menuItemId"":""<id from /api/menu>"",""quantity"":2}]}"
```

### View admin summary (requires token)
```powershell
curl http://localhost:8869/api/admin/summary `
  -H "Authorization: Bearer <your-token>"
```

---

## Admin Account

**Admin Credentials:**
```
Email:    admin@abolgardencafe.et
Password: adminpass123
```

**Admin Dashboard:** http://localhost:1995/admin  
**Features:**
- Professional sidebar navigation
- Stats overview (orders, revenue, bookings)
- Order management
- Booking management
- Menu management
- Reports and analytics

---

## 🎨 Design Features

### Professional Restaurant Theme
- **Colors:** Forest Green (#0F3D2C), Brass Gold (#C9A961), Terracotta (#D4654F)
- **Typography:** Playfair Display (headings), Montserrat (subheadings), Inter (body)
- **Components:** Reusable UI library (Button, Card, Badge, Input)
- **Approach:** Food-first design showcasing full restaurant experience

### Public Website
- Video hero section with café atmosphere
- Featured menu with 6 items
- "Why Choose Us" section with features
- Garden dining experience showcase
- Professional navigation and footer
- Mobile responsive throughout

### Admin Dashboard
- Fixed sidebar navigation
- Clean white cards on gray background
- Stats overview cards
- Quick action buttons
- Recent orders and bookings tables
- Mobile responsive with hamburger menu

### Menu System
- 27 authentic Ethiopian dishes with real photos
- Search and filter functionality
- 4 categories with icons
- Detailed descriptions and tasting notes
- Ethiopian Birr (ETB) pricing

---

## 📸 Real Menu (27 Items)

### ☕ Coffee & Tea (7 items)
- Traditional Ethiopian Buna (Coffee Ceremony)
- Macchiato (Ethiopian Style)
- Yirgacheffe Coffee, Sidamo Coffee, Harar Coffee
- Cappuccino, Spris

### 🥤 Beverages (2 items)
- Fresh Fruit Juice
- Soft Drinks

### 🍽️ Main Dishes (9 items)
- Special Combo (signature dish)
- Fresh Injera with Wat, Tibs, Kitfo
- Fasting Platter (Vegan)
- Chicken Shawarma, Pizza, Cheeseburger
- Abol Metiro

### 🥐 Bakes & Desserts (5 items)
- Ambasha, Dabo (Ethiopian breads)
- Fresh Pastries, Cake
- Cardamom Kouign-Amann

All menu items include authentic photos stored in `public/images/menu/`

---

```
Cafe file/
|-- README.md                          <- You are here
|-- start-all.ps1                      <- One-command launcher
|
|-- kiln-cafe-backend/
|   `-- kiln-cafe-backend/
|       |-- .env                       <- Port 8869, MongoDB URI, JWT secret
|       |-- package.json               <- Express + Mongoose
|       `-- src/
|           |-- index.ts               <- App entry point (async MongoDB connect)
|           |-- app.ts                 <- Express setup, routes, middleware
|           |-- seed.ts                <- Database seeder (run via: npm run seed)
|           |-- models/                <- Mongoose models (User, MenuItem, Order, Booking)
|           |-- services/              <- Business logic (auth, menu, orders, bookings)
|           |-- controllers/           <- Route handlers
|           |-- routes/                <- Express routers
|           |-- middleware/            <- Auth, error handler, rate limiter, validate
|           |-- utils/                 <- JWT, password helpers
|           `-- config/
|               `-- db.ts              <- Mongoose connection
|
`-- kiln-cafe-frontend/
    `-- kiln-cafe/
        |-- .env.local                 <- API_BASE_URL=http://localhost:8869/api
        `-- app/
            |-- page.tsx               <- Home page
            |-- menu/page.tsx          <- Menu browser
            |-- booking/page.tsx       <- Booking form
            `-- order/page.tsx         <- Checkout
```

---

## Stopping the Project

1. Close the **backend** PowerShell window
2. Close the **frontend** PowerShell window
3. Press **Ctrl+C** in the MongoDB terminal (or just close it)

---

## Port Reference

| Service | Port |
|---------|------|
| Frontend (Next.js) | **1995** |
| Backend (Express) | **8869** |
| MongoDB | **27017** |
