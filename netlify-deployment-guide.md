# 🚀 Complete Netlify Deployment Guide

## Step 1: Deploy from GitHub

1. **Go to Netlify**: [netlify.com](https://netlify.com)
2. **Click "Add new site"** → **"Import an existing project"**
3. **Choose "Deploy with GitHub"**
4. **Select your repository**: `Wais09/MMAC`

## Step 2: Configure Build Settings

```
Base directory: marrickville-martial-arts
Build command: bun run build
Publish directory: marrickville-martial-arts/.next
```

## Step 3: Add Environment Variables

**In Netlify Dashboard:**
1. Go to **Site settings** → **Environment variables**
2. Click **"Add a variable"** for each of these:

```env
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY
AIzaSyCtldMho592v2hLQI1WoE5Wkl_y4iMDC_o

NEXT_PUBLIC_GOOGLE_PLACE_ID
ChIJLeH5UMKxEmsRo6OV-6uCSR4

NEXTAUTH_SECRET
d6b60c771236f6012eed5eb6e858326e

NEXTAUTH_URL
https://mmac-marrickville.netlify.app

DATABASE_URL
postgresql://postgres.myameoaohqscvrktzyjm:MachinE33@db.myameoaohqscvrktzyjm.supabase.co:5432/postgres
```

## Step 4: Deploy!

1. **Click "Deploy site"**
2. **Wait for build to complete** (about 2-3 minutes)
3. **Your site will be live!**

## Step 5: Update Site Name (Optional)

1. Go to **Site settings** → **General** → **Site details**
2. **Change site name** to `mmac-marrickville`
3. **Update NEXTAUTH_URL** environment variable to match new URL

---

## 🎯 Expected Result:
✅ **Live martial arts portal** with Google Reviews working
✅ **Member portal ready** for authentication
✅ **Full functionality** preserved from local development

**Your site will be at: https://mmac-marrickville.netlify.app**
