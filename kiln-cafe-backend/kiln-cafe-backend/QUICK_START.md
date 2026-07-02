# ⚡ Quick Start - Kiln Coffee House API

## 🎯 3 Simple Steps to Run Your Server

---

## Step 1️⃣: Start MongoDB

Choose ONE option:

### Option A: Docker (Recommended - Easiest)
```bash
docker run --name kiln-mongo -p 27017:27017 -d mongo:latest
```

### Option B: Local MongoDB
- Download: https://www.mongodb.com/try/download/community
- Install and start the service

### Option C: MongoDB Atlas (Cloud - Free)
- Sign up: https://www.mongodb.com/cloud/atlas
- Create cluster and get connection string
- Update `MONGO_URI` in `.env` file

---

## Step 2️⃣: Run the Startup Script

### Windows Users (EASIEST):
**Just double-click:** `start-server.bat`

### OR Run Manually:
```bash
cd "c:\Protected File\Real Project\Cafe file\kiln-cafe-backend\kiln-cafe-backend"
npm install
npm run build
npm run seed
npm run dev
```

---

## Step 3️⃣: Test Your API

Open your browser and go to:

🌐 **http://localhost:8869/health**

You should see:
```json
{"status":"ok"}
```

✅ **Your API is running!**

---

## 🎨 What's Next?

### View the Menu
🌐 http://localhost:8869/api/menu

### Login as Admin
Use these credentials to test:
- **Email:** admin@kilncoffeehouse.example
- **Password:** adminpass123

### Connect Your Frontend
Point your frontend to:
```
API_BASE_URL=http://localhost:8869/api
```

---

## 📚 Full Documentation

- **SETUP_GUIDE.md** - Complete setup instructions
- **FIXES_APPLIED.md** - All fixes and changes made
- **README.md** - Project overview and API reference

---

## ❓ Something Not Working?

### MongoDB Connection Failed?
Make sure MongoDB is running:
```bash
# Check if Docker container is running
docker ps

# Or restart it
docker start kiln-mongo
```

### Port Already in Use?
Change the port in `.env`:
```
PORT=8870
```

### Build Errors?
```bash
# Clean and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 🎉 That's It!

Your Kiln Coffee House API is ready to serve!

**Happy Coding! ☕**
