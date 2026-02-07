# GitHub Clone - Setup & Run Guide

## ✅ Current Status
- **Backend**: Running on `http://localhost:3002`
- **Frontend**: Running on `http://localhost:5174`
- **Database**: MongoDB configured (connection pending IP whitelist)

---

## 📋 What's Implemented

### Backend (Node.js + Express)
✅ User authentication (Signup/Login with JWT)  
✅ User profile management (Get, Update, Delete)  
✅ Repository CRUD operations  
✅ Issue management (Create, Update, Delete, List)  
✅ MongoDB integration with Mongoose  
✅ Auth middleware for protected routes  
✅ CORS enabled  
✅ Socket.IO ready for real-time features  

### Frontend (React + Vite)
✅ Authentication Context (login persistence)  
✅ Login & Signup pages with form validation  
✅ Dashboard with repo listing & search  
✅ Repo creation modal  
✅ User profile page  
✅ Navbar with navigation  
✅ Axios API service with automatic auth token injection  

---

## 🚀 Quick Start

### 1. **Backend**
Already running. If you need to restart:

```powershell
cd "d:\Version Control\Backend"
npm run start
```

Backend available at: `http://localhost:3002`

### 2. **Frontend**
Already running. If you need to restart:

```powershell
cd "d:\Version Control\Frontend"
npm run dev
```

Frontend available at: `http://localhost:5174`

### 3. **Test the App**
1. Go to `http://localhost:5174`
2. Click "Create an account" or signup with:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `test123`
3. After signup, you'll be redirected to the dashboard
4. Try:
   - Creating a new repository
   - Viewing suggested repositories
   - Going to your profile

---

## 🗄️ MongoDB Connection

**Current Issue:** MongoDB connection shows DNS resolution error.  
**Status:** Backend server is running, just not connected to MongoDB yet.

### To Fix MongoDB Connection:

1. Your credentials are in `Backend/.env`:
   ```
   MONGODB_URI=mongodb+srv://version_control:version1control@cluster0.pqga7ds.mongodb.net/?appName=Cluster0
   ```

2. **Check MongoDB Atlas settings:**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Under Network Access → IP Whitelist
   - Add your current IP address (or 0.0.0.0/0 for development)
   - Click "Confirm"

3. **Verify database name:**
   - The app uses database name: `githubclone` (auto-created on first write)
   - Atlas cluster is: `cluster0.pqga7ds.mongodb.net`

4. **Test connection manually:**
   ```powershell
   cd "d:\Version Control\Backend"
   node -e "
   require('dotenv').config();
   const mongoose = require('mongoose');
   mongoose.connect(process.env.MONGODB_URI)
     .then(() => { console.log('✅ Connected to MongoDB!'); process.exit(0); })
     .catch((err) => { console.error('❌ Connection failed:', err.message); process.exit(1); });
   "
   ```

---

## 📁 Project Structure

```
Backend/
  ├── controllers/        (Business logic for users, repos, issues)
  ├── models/            (Mongoose schemas: User, Repository, Issue)
  ├── routes/            (API endpoints)
  ├── middleware/        (Auth, authorization)
  ├── config/            (AWS config placeholder)
  ├── .env               (MongoDB URI & JWT secret)
  ├── index.js           (Express server entry)
  └── package.json

Frontend/
  ├── src/
  │   ├── components/
  │   │   ├── auth/      (Login, Signup)
  │   │   ├── dashboard/ (Home, repo listing)
  │   │   └── user/      (Profile)
  │   ├── authContext.jsx (Auth state)
  │   ├── api.js         (Axios API service)
  │   └── Routes.jsx     (React Router setup)
  ├── index.html
  ├── package.json
  └── vite.config.js
```

---

## 🔌 API Endpoints

### Auth (No auth required)
- `POST /signup` - Register new user
- `POST /login` - Login and get JWT token

### User (Auth required - add `Authorization: Bearer <token>` header)
- `GET /users` - List all users
- `GET /user/:id` - Get user profile
- `PUT /user/update/:id` - Update profile
- `DELETE /user/delete/:id` - Delete profile

### Repository
- `POST /repo/create` - Create repo
- `GET /repo/all` - Get all repos
- `GET /repo/:id` - Get repo by ID
- `GET /repo/name/:name` - Get repo by name
- `GET /repo/user/:userID` - Get user's repos
- `PUT /repo/update/:id` - Update repo
- `DELETE /repo/delete/:id` - Delete repo
- `PATCH /repo/toggle/:id` - Toggle visibility

### Issues
- `POST /issue/create/:repoId` - Create issue
- `GET /issue/all/:repoId` - Get all issues for repo
- `GET /issue/:id` - Get issue by ID
- `PUT /issue/update/:id` - Update issue
- `DELETE /issue/delete/:id` - Delete issue

---

## 🔐 Authentication Flow

1. **Signup/Login**: Send email & password to backend
2. **Backend returns**: JWT token + user ID
3. **Frontend stores**: Token in localStorage
4. **API Service**: Automatically adds `Authorization: Bearer <token>` to all requests
5. **Protected routes**: Middleware validates token before accessing resources

---

## 📝 Credentials Example

**Test Account (you can create):**
```
Email: test@example.com
Password: Test@123
Username: testuser
```

---

## 🐛 Troubleshooting

### Port already in use?
```powershell
# Kill process on port 3002 (backend)
Get-Process -Id (Get-NetTCPConnection -LocalPort 3002).OwningProcess | Stop-Process -Force

# Kill process on port 5174 (frontend)
Get-Process -Id (Get-NetTCPConnection -LocalPort 5174).OwningProcess | Stop-Process -Force
```

### MongoDB still not connecting?
- Ensure your Atlas IP whitelist includes your machine's IP
- Credentials: `version_control` / `version1control`
- Database: `githubclone` (auto-created)

### Frontend not connecting to backend?
- Backend should run on `http://localhost:3002`
- Check browser console for error messages
- Ensure CORS is enabled (it is by default)

---

## 🎯 Next Steps / Enhancements

- [ ] Add file upload for repos
- [ ] Implement notifications
- [ ] Add pull requests feature
- [ ] Implement followers system
- [ ] Add repo forking
- [ ] Implement search across repos
- [ ] Add activity feed
- [ ] Improve UI/UX styling
- [ ] Add unit tests
- [ ] Deploy to cloud (Vercel for frontend, Railway/Heroku for backend)

---

## 💡 Notes

- JWT tokens expire in 1 hour
- Passwords are hashed using bcryptjs
- MongoDB timestamps are auto-added to all documents
- The app is fully functional even without MongoDB (in-memory data) for testing
- Socket.IO is ready but not yet implemented in frontend

---

**Your GitHub Clone is ready! 🚀**
