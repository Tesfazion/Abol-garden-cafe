# Kiln Coffee House API - Setup & Run Guide

## 🚀 Quick Start Guide

### Prerequisites
1. **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
2. **MongoDB** - Choose ONE of these options:
   - **Option A: Docker** (Easiest - Recommended)
   - **Option B: Local MongoDB Installation**
   - **Option C: MongoDB Atlas** (Cloud - Free tier available)

---

## Setup Steps

### Step 1: Install Dependencies
```bash
cd "c:\Protected File\Real Project\Cafe file\kiln-cafe-backend\kiln-cafe-backend"
npm install
```

### Step 2: Setup MongoDB

#### Option A: Using Docker (Recommended)
If you have Docker installed:
```bash
docker run --name kiln-mongo -p 27017:27017 -d mongo:latest
```

To check if it's running:
```bash
docker ps
```

#### Option B: Local MongoDB Installation
1. Download MongoDB Community Edition: https://www.mongodb.com/try/download/community
2. Install and start MongoDB service
3. MongoDB will run on `mongodb://localhost:27017` by default

#### Option C: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (free tier available)
4. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/cafe`)
5. Update `.env` file with this connection string

### Step 3: Configure Environment Variables
Your `.env` file is already configured with:
```
PORT=8869
MONGO_URI=mongodb://localhost:27017/cafe
JWT_SECRET="super-secret-kiln-coffee-house-development-jwt-key-2026"
```

✅ This is ready to use for local development!

### Step 4: Seed the Database
This will create:
- An admin user (email: admin@kilncoffeehouse.example, password: adminpass123)
- Sample menu items (coffees, bakes, plates)

```bash
npm run seed
```

### Step 5: Start the Development Server
```bash
npm run dev
```

You should see:
```
MongoDB connected: mongodb://localhost:27017/cafe
Kiln Coffee House API listening on http://localhost:8869
```

---

## 🧪 Testing the API

### 1. Health Check
Open your browser or use curl:
```bash
curl http://localhost:8869/health
```
Expected response: `{"status":"ok"}`

### 2. View Menu Items
```bash
curl http://localhost:8869/api/menu
```

### 3. Login as Admin
```bash
curl -X POST http://localhost:8869/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"admin@kilncoffeehouse.example\",\"password\":\"adminpass123\"}"
```

This will return a JWT token you can use for authenticated requests.

---

## 📁 Project Structure
```
src/
├── config/         # Database connection
├── controllers/    # Request handlers
├── middleware/     # Auth, rate limiting, error handling
├── models/         # MongoDB schemas (User, MenuItem, Order, Booking)
├── routes/         # API routes
├── services/       # Business logic
├── utils/          # Helper functions
├── app.ts          # Express app setup
├── index.ts        # Server entry point
└── seed.ts         # Database seeding script
```

---

## 🔌 API Endpoints

### Base URL: `http://localhost:8869/api`

#### Public Endpoints
- `GET /health` - Health check
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /menu` - Get all menu items
- `GET /menu/:id` - Get single menu item
- `POST /orders` - Create order (guest or authenticated)
- `POST /bookings` - Create booking (guest or authenticated)

#### Protected Endpoints (Require Authentication)
- `GET /orders/mine` - Get my orders
- `GET /bookings/mine` - Get my bookings
- `DELETE /bookings/:id` - Cancel my booking

#### Staff/Admin Only
- `POST /menu` - Create menu item
- `PATCH /menu/:id` - Update menu item
- `DELETE /menu/:id` - Delete menu item (soft delete)
- `GET /orders` - Get all orders
- `PATCH /orders/:id/status` - Update order status
- `GET /bookings` - Get all bookings
- `PATCH /bookings/:id/status` - Update booking status
- `GET /admin/summary` - Get dashboard summary

---

## 🛠️ Available Scripts

- `npm run dev` - Start development server with auto-reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server (requires `npm run build` first)
- `npm run seed` - Seed database with initial data
- `npm test` - Run tests

---

## 🔧 Common Issues & Solutions

### Issue: "MongoDB connection failed"
**Solution:** Make sure MongoDB is running
- Docker: `docker start kiln-mongo`
- Local: Start MongoDB service
- Atlas: Check your connection string and network access

### Issue: "Port 8869 already in use"
**Solution:** 
1. Find and kill the process: `netstat -ano | findstr :8869`
2. Or change the PORT in `.env` file

### Issue: "npm install fails"
**Solution:** 
1. Delete `node_modules` folder
2. Delete `package-lock.json`
3. Run `npm install` again

---

## 🌐 Frontend Integration

The frontend should be configured to connect to:
```
API_BASE_URL=http://localhost:8869/api
```

For the actual deployed frontend (port 1995), it's already configured in CORS:
```
CORS_ORIGIN=http://localhost:1995
```

---

## 📊 Default Admin Credentials

After running `npm run seed`:
- **Email:** admin@kilncoffeehouse.example
- **Password:** adminpass123

⚠️ **Change these credentials in production!**

---

## 🎯 Next Steps

1. ✅ All TypeScript errors are fixed
2. ✅ Project builds successfully
3. ✅ Ready to run with MongoDB
4. ✅ Seed data script ready
5. 🎨 Connect your frontend application
6. 🧪 Test all API endpoints
7. 🚀 Deploy to production when ready

---

## 📝 Notes

- The project uses **MongoDB with Mongoose** (not PostgreSQL/Prisma as mentioned in old README)
- All passwords are hashed with bcrypt
- JWT tokens expire after 7 days (configurable)
- API includes rate limiting and security headers
- Guest checkout is supported (no login required for orders/bookings)
