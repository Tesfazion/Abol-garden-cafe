# Kiln Coffee House — Project Guide

A full-stack cafe web app: **Next.js 14** frontend + **Express + MongoDB** backend.

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
| Home | http://localhost:1995/ | Landing page |
| Menu | http://localhost:1995/menu | Browse + add items to cart |
| Booking | http://localhost:1995/booking | Reserve a table |
| Checkout | http://localhost:1995/order | Place an order |

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

## Admin Account (seeded automatically)
```
Email:    admin@kilncoffeehouse.example
Password: adminpass123
```

---

## Project Structure

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
