# MongoDB Connection Fix

Your GitHub Clone is **almost fully operational**. The only thing pending is MongoDB Atlas IP whitelist configuration.

## Current Situation
 **Backend Server**: Running on http://localhost:3002  
 **Frontend App**: Running on http://localhost:5174  
 **MongoDB**: Not connecting (DNS/Network issue)  

---

## What to Do RIGHT NOW

### Step 1: Go to MongoDB Atlas
Visit: https://cloud.mongodb.com

### Step 2: Add Your IP to Whitelist
1. Click on **"Network Access"** in the left sidebar
2. Click **"Add IP Address"**
3. Choose one option:
   - **For testing**: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - **For security**: Paste your current IP (ask your ISP or use https://whatismyipaddress.com)
4. Click **"Confirm"**
5. Wait 1-2 minutes for it to apply

### Step 3: Restart Backend
```powershell
# Kill the current backend process
Get-Process -Id (Get-NetTCPConnection -LocalPort 3002).OwningProcess | Stop-Process -Force

# Restart it
cd "d:\Version Control\Backend"
npm run start
```

In the terminal, you should now see:
```
Server is running on PORT 3002
MongoDB connected!
```

---

## Your MongoDB Credentials

```
Username: version_control
Password: version1control
Server: cluster0.pqga7ds.mongodb.net
Database: githubclone (auto-created)
```

---

## Test It Works

Once MongoDB connects, create an account:
1. Go to http://localhost:5174
2. Sign up
3. Check your browser console - it should successfully create your user

That's it! 
