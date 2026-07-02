# 🌐 How to View Your Website in Browser

## 🎯 Simple 2-Step Process

---

## Step 1️⃣: Start MongoDB

Open **PowerShell or Command Prompt** and run:

### Option A: Docker (Easiest)
```bash
docker run --name kiln-mongo -p 27017:27017 -d mongo:latest
```

### Option B: Local MongoDB
```bash
mongod --dbpath C:\data\db
```
*(Keep this window open)*

### Option C: MongoDB Atlas
- If using cloud MongoDB, just make sure your connection string is in the backend `.env` file

---

## Step 2️⃣: Start Everything

### Open PowerShell in your project root and run:

```powershell
cd "c:\Protected File\Real Project\Cafe file"
.\start-all.ps1
```

This script will:
1. ✅ Check MongoDB connection
2. ✅ Install dependencies (if needed)
3. ✅ Seed database with sample data
4. ✅ Start backend server (port 8869)
5. ✅ Start frontend website (port 1995)

---

## Step 3️⃣: Open Your Browser! 🎉

### **Your Website:**
🌐 **http://localhost:1995**

This is your main website where you'll see:
- Coffee shop homepage
- Menu items (coffees, bakes, plates)
- Order system
- Booking system

### **Backend API (for testing):**
🔧 **http://localhost:8869/health**
🔧 **http://localhost:8869/api/menu**

---

## 📊 What You'll See

After starting, two PowerShell windows will open:

**Window 1: Backend (API)**
```
MongoDB connected: mongodb://localhost:27017/cafe
Kiln Coffee House API listening on http://localhost:8869
```

**Window 2: Frontend (Website)**
```
- ready started server on 0.0.0.0:1995, url: http://localhost:1995
✓ Compiled successfully
```

**Then open your browser:** http://localhost:1995

---

## 🎨 What's on the Website?

Your Kiln Coffee House website includes:

### 1. **Homepage** 🏠
- Welcome section
- Featured items
- About the cafe

### 2. **Menu** ☕
- Coffee drinks (Yirgacheffe, Huila Decaf, House Espresso, Chai Latte)
- Bakes (Sourdough, Croissants, Kouign-Amann)
- Plates (Toast, Eggs, Mushroom Bowl)

### 3. **Order System** 🛒
- Browse menu
- Add items to cart
- Place orders (with or without account)

### 4. **Booking System** 📅
- Reserve a table
- Select date, time, party size
- Guest or user bookings

### 5. **User Accounts** 👤
- Register new account
- Login
- View your orders
- View your bookings

### 6. **Admin Panel** 🔧
- Manage menu items
- View all orders
- Manage bookings
- Dashboard with stats

---

## 🔐 Default Login Credentials

After seeding the database:

**Admin Account:**
- Email: `admin@kilncoffeehouse.example`
- Password: `adminpass123`

Use this to access admin features!

---

## 🛑 How to Stop the Servers

1. Close the two PowerShell windows (Backend & Frontend)
2. Or press `Ctrl+C` in each window

MongoDB can keep running in the background.

---

## 🆘 Troubleshooting

### Problem: "MongoDB connection failed"
**Solution:** Make sure MongoDB is running first
```bash
# Docker
docker start kiln-mongo

# Or Local
mongod --dbpath C:\data\db
```

### Problem: "Port 1995 already in use"
**Solution:** Find and close the process using that port
```bash
netstat -ano | findstr :1995
# Then kill the process ID shown
```

### Problem: PowerShell script won't run
**Solution:** Enable scripts execution
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Problem: Frontend shows connection errors
**Solution:** Make sure backend is running on port 8869
- Check: http://localhost:8869/health
- Should return: `{"status":"ok"}`

---

## 📱 Access from Other Devices

Want to test on your phone or tablet?

1. Find your computer's IP address:
   ```bash
   ipconfig
   # Look for IPv4 Address (e.g., 192.168.1.100)
   ```

2. Open on other device:
   - Website: `http://YOUR-IP:1995`
   - API: `http://YOUR-IP:8869`

3. Update CORS in backend `.env`:
   ```
   CORS_ORIGIN=http://localhost:1995,http://YOUR-IP:1995
   ```

---

## 🎯 Quick Reference

| Service | URL | Purpose |
|---------|-----|---------|
| **Website (Main)** | http://localhost:1995 | Your coffee shop website |
| Backend API | http://localhost:8869 | API server |
| Health Check | http://localhost:8869/health | Test backend is running |
| Menu API | http://localhost:8869/api/menu | View menu items |
| MongoDB | localhost:27017 | Database |

---

## ✨ Summary

**To see your website:**

1. Start MongoDB (Docker or local)
2. Run: `.\start-all.ps1`
3. Wait 30 seconds
4. Open browser: **http://localhost:1995**
5. Enjoy your coffee shop website! ☕

---

## 🎉 That's It!

Your full-stack Kiln Coffee House website is now running!

- **Frontend (Next.js):** Beautiful, responsive website
- **Backend (Express):** RESTful API with authentication
- **Database (MongoDB):** Storing all your data

**Enjoy your coffee shop website!** ☕✨
