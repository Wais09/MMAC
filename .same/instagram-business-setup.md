# Instagram Graph API Business Setup Guide
## Complete Setup for Marrickville Martial Arts

**Goal:** Connect your Instagram business account to show real posts with captions, comments, and engagement data on your Socials page for maximum SEO benefit.

---

## 📋 **Phase 1: Prepare Your Instagram Account**

### Step 1: Convert to Instagram Business Account

1. **Open Instagram app on your phone**
2. **Go to your profile → Menu (☰) → Settings**
3. **Tap "Account"**
4. **Tap "Switch to Professional Account"**
5. **Choose "Business" (not Creator)**
6. **Select category:** "Gym/Physical Fitness Center" or "Sports & Recreation"
7. **Add contact info:**
   - Phone: (042) 311 1999
   - Email: info@marrickvillemartialartsclub.com.au
   - Address: Marrickville, NSW

### Step 2: Create/Connect Facebook Page

1. **During business account setup, connect to Facebook Page**
2. **If you don't have a Facebook Page:**
   - Create one: facebook.com/pages/create
   - Name: "Marrickville Martial Arts Club"
   - Category: "Gym/Physical Fitness Center"
3. **Connect Instagram to Facebook Page:**
   - Instagram Settings → Account → Linked Accounts → Facebook
   - Connect to your business page

---

## 🏗️ **Phase 2: Create Facebook Developer App**

### Step 1: Access Facebook Developers

1. **Go to [developers.facebook.com](https://developers.facebook.com/)**
2. **Log in with the same Facebook account connected to your page**
3. **Click "My Apps" → "Create App"**

### Step 2: Choose App Type

1. **Select "Business"** (important for Graph API access)
2. **Fill in details:**
   - **App Name:** `Marrickville Martial Arts API`
   - **App Contact Email:** `info@marrickvillemartialartsclub.com.au`
   - **Business Account:** Select existing or create new

### Step 3: Add Required Products

1. **In your app dashboard, find "Add Products"**
2. **Add these products in order:**
   - **Facebook Login** (click "Set up")
   - **Instagram Basic Display** (click "Set up")
   - **Instagram Graph API** (if available, click "Set up")

### Step 4: Configure Facebook Login

1. **Go to Facebook Login → Settings**
2. **Add Valid OAuth Redirect URIs:**
   ```
   https://marrickvillemartialartsclub.com.au/auth/facebook/callback
   http://localhost:3000/auth/facebook/callback
   ```
3. **Save changes**

---

## 🔑 **Phase 3: Get Your Access Credentials**

### Step 1: Get App Credentials

1. **Go to "App Settings" → "Basic"**
2. **Copy and save these:**
   - **App ID:** (public, safe to use)
   - **App Secret:** (keep private, click "Show" to reveal)

### Step 2: Generate Access Token

1. **Go to [Graph API Explorer](https://developers.facebook.com/tools/explorer/)**
2. **In top dropdown, select your app**
3. **Click "Generate Access Token"**
4. **Request permissions:**
   - `pages_show_list`
   - `pages_read_engagement`
   - `instagram_basic`
   - `instagram_manage_insights` (if available)

### Step 3: Get Page Access Token

1. **In Graph API Explorer, make a GET request to:**
   ```
   /me/accounts
   ```
2. **Find your Marrickville Martial Arts page in results**
3. **Copy the `access_token` for your page**
4. **Also copy the `id` (this is your Page ID)**

### Step 4: Get Instagram Business Account ID

1. **In Graph API Explorer, use your page access token**
2. **Make a GET request to:**
   ```
   /{YOUR_PAGE_ID}?fields=instagram_business_account
   ```
3. **Copy the `instagram_business_account.id` from the result**

### Step 5: Exchange for Long-Lived Token

1. **In Graph API Explorer, make a GET request to:**
   ```
   /oauth/access_token?grant_type=fb_exchange_token&client_id={YOUR_APP_ID}&client_secret={YOUR_APP_SECRET}&fb_exchange_token={YOUR_SHORT_LIVED_TOKEN}
   ```
2. **Replace:**
   - `{YOUR_APP_ID}` with your App ID
   - `{YOUR_APP_SECRET}` with your App Secret
   - `{YOUR_SHORT_LIVED_TOKEN}` with your page access token
3. **Copy the new long-lived token from the response**

---

## ⚙️ **Phase 4: Add Credentials to Your Website**

### Step 1: Update Environment Variables

1. **Open your `.env.local` file in the project**
2. **Replace the placeholder values:**

```env
# Instagram Graph API (Business) - WORKING CREDENTIALS
NEXT_PUBLIC_INSTAGRAM_APP_ID=your_app_id_here
INSTAGRAM_APP_SECRET=your_app_secret_here
INSTAGRAM_ACCESS_TOKEN=your_long_lived_page_token_here

# Instagram Business Account Details
FACEBOOK_PAGE_ID=your_facebook_page_id_here
INSTAGRAM_BUSINESS_ACCOUNT_ID=your_instagram_business_account_id_here
```

### Step 2: Restart Development Server

```bash
# Stop current server (Ctrl+C)
# Then restart:
bun run dev
```

---

## 🧪 **Phase 5: Test Your Connection**

### Step 1: Test API Connection

1. **Go to your website: `http://localhost:3000/socials`**
2. **Look for the admin controls at the top**
3. **Check "Use Real Instagram API" checkbox**
4. **Click "Refresh Posts"**
5. **You should see your real Instagram posts with:**
   - Real photos/videos
   - Actual captions
   - Like counts
   - Comment counts
   - Post dates

### Step 2: Verify SEO Features

1. **View page source** (right-click → View Source)
2. **Search for your Instagram captions** - they should be in the HTML
3. **Look for structured data** - should include your real post data
4. **Check meta tags** - should reflect real content

### Step 3: Test Mobile Responsiveness

1. **Open browser dev tools** (F12)
2. **Switch to mobile view**
3. **Verify videos/images load correctly**
4. **Test video playback**

---

## 🚨 **Troubleshooting Common Issues**

### "Invalid OAuth Access Token"
- **Solution:** Regenerate long-lived token using Graph API Explorer
- **Check:** Make sure you used page access token, not user token

### "Instagram Business Account Not Found"
- **Solution:** Verify Instagram is connected to your Facebook Page
- **Check:** Instagram Settings → Account → Linked Accounts → Facebook

### "Permission Denied"
- **Solution:** Add required permissions in Graph API Explorer
- **Required:** `pages_show_list`, `pages_read_engagement`, `instagram_basic`

### "No Posts Showing"
- **Check:** Instagram account has public posts
- **Verify:** Business account is properly set up
- **Test:** Use Graph API Explorer to manually query posts

---

## 📈 **SEO Benefits You'll Get**

Once connected, your Socials page will provide:

✅ **Real Instagram captions** with martial arts keywords
✅ **Hashtags crawlable** by search engines
✅ **Engagement metrics** (likes, comments) for social proof
✅ **Fresh content** that updates automatically
✅ **Structured data** for rich snippets
✅ **Local SEO benefits** from location-tagged posts

---

## 🔄 **Token Maintenance**

**Important:** Page access tokens expire every 60 days

**Setup automatic refresh:**
1. Set calendar reminder for token renewal
2. Use Graph API Explorer to get new token
3. Update `.env.local` file
4. Restart server

**For production:** Consider implementing automatic token refresh

---

## 📞 **Need Help?**

If you get stuck at any step:

1. **Check browser console** for detailed error messages
2. **Verify all IDs and tokens** are correctly copied
3. **Make sure Instagram is set to Business account**
4. **Confirm Facebook Page is connected to Instagram**

**Common mistakes:**
- Using user token instead of page token
- Not connecting Instagram to Facebook Page
- Missing required permissions in Graph API Explorer

---

## ✅ **Next Steps**

Once your Instagram is connected:

1. **Test thoroughly** across all devices
2. **Check SEO improvements** in search results
3. **Monitor post updates** when you publish new content
4. **Set up token renewal** process for production

Your Marrickville Martial Arts Socials page will become a powerful SEO asset with real, engaging content that search engines can crawl and index!
